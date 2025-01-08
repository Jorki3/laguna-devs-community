import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Github, User } from "lucide-react";
import { NavLink } from "./NavLink";

export const NavLinks = ({ session, profile, handleSignOut }) => {
  const navigate = useNavigate();

  return (
    <>
      <NavLink to="/">Inicio</NavLink>
      <NavLink to="/events">Eventos</NavLink>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>{profile?.username || "Usuario"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate("/dashboard")}>
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut}>
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <NavLink to="/login">
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Github className="w-4 h-4" />
            <span>Iniciar Sesión</span>
          </Button>
        </NavLink>
      )}
    </>
  );
};
