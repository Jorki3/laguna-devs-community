import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        setUsername(data.username || "");
        setAvatarUrl(data.avatar_url || "");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      if (!userId) return;

      const { error } = await supabase
        .from("profiles")
        .update({
          username,
          avatar_url: avatarUrl,
        })
        .eq("id", userId);

      if (error) throw error;
      toast.success("Perfil actualizado exitosamente");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al actualizar el perfil");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto p-4">
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Mi Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatarUrl} alt={username} />
                <AvatarFallback>{username?.charAt(0)?.toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Tu nombre de usuario"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar">URL del Avatar</Label>
              <Input
                id="avatar"
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://ejemplo.com/tu-avatar.jpg"
              />
            </div>

            <Button onClick={updateProfile} className="w-full">
              Actualizar Perfil
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;