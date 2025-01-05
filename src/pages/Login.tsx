import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/");
      }
    });
  }, [navigate]);

  const handleGithubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        toast.error("Error al iniciar sesión con GitHub");
        console.error("Error de autenticación:", error);
      }
    } catch (error) {
      toast.error("Error al iniciar sesión con GitHub");
      console.error("Error inesperado:", error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center p-4 pt-32">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-display text-2xl">Bienvenido de nuevo</CardTitle>
            <CardDescription>Inicia sesión para acceder a tu cuenta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleGithubLogin}
              className="w-full flex items-center justify-center space-x-2" 
              variant="outline"
            >
              <Github className="w-5 h-5" />
              <span>Continuar con GitHub</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;