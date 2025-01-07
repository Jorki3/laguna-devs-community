import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { SupabaseSession, ProfileData } from "../pages/Profile"; // Importante: Importación desde Profile.tsx

interface ProfileFormProps {
  profile: ProfileData;
  setProfile: React.Dispatch<React.SetStateAction<ProfileData | null>>;
  session: SupabaseSession | null;
}

const ProfileForm = ({ profile, setProfile, session }: ProfileFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<ProfileData>({ defaultValues: profile });

  const onSubmit = async (data: ProfileData) => {
    if (!session?.user?.id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo obtener el ID del usuario.",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error updating profile:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Error al actualizar el perfil.",
        });
        return; // Salir de la función en caso de error
      }

      toast({
        title: "Éxito",
        description: "Perfil actualizado correctamente.",
      });
      setProfile(data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al actualizar el perfil.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nombre Completo" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biografía</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Cuéntanos sobre ti" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Actualizar Perfil</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
