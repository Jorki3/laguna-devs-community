import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import ProfileForm from "@/components/ProfileForm";
import { useToast } from "@/components/ui/use-toast";
import { Session, User } from "@supabase/supabase-js";

export interface SupabaseSession extends Session {
  user: User;
}

export interface ProfileData {
  id: string;
  user_id: string;
  full_name: string;
  bio: string;
  avatar_url: string | null;
  username: string | null;
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState<SupabaseSession | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(
    async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, user_id, full_name, bio, avatar_url, username")
          .eq("user_id", userId)
          .single<ProfileData>();

        if (error && error.message === "No rows found") {
          // Comprobar si no existen filas
          const { data: newProfile, error: newProfileError } = await supabase
            .from("profiles")
            .insert([{ user_id: userId }])
            .select()
            .single<ProfileData>();

          if (newProfileError) {
            console.error("Error creating default profile:", newProfileError);
            toast({
              variant: "destructive",
              title: "Error",
              description: "Error creating profile.",
            });
            return;
          }

          setProfile(newProfile); // Establecer el nuevo perfil creado
          return; // Importante: salir de la función después de crear el perfil
        } else if (error) {
          // Manejar otros errores diferentes a "No rows found"
          console.error("Error fetching profile:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Error fetching profile.",
          });
          return;
        }

        setProfile(data);
      } catch (error) {
        console.error("Unexpected error fetching profile:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred.",
        });
      }
    },
    [toast]
  );

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setLoading(false);

      if (!session) {
        navigate("/login");
        return;
      }

      setSession(session);
      if (session?.user?.id) {
        fetchProfile(session.user.id);
      }
    };

    getSession();
  }, [navigate, fetchProfile]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  // Ahora se renderiza el formulario independientemente de si profile es null o no.
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-32 px-4">
        <h1 className="text-3xl font-bold mb-8">Mi Perfil</h1>
        {profile && (
          <ProfileForm
            profile={profile}
            setProfile={setProfile}
            session={session}
          />
        )}
        {!profile && (
          <div>Error al cargar el perfil. Contacte con soporte.</div>
        )}
      </div>
    </>
  );
};

export default Profile;
