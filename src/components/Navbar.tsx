import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-display text-xl font-bold">Laguna Devs</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/events" className="text-sm font-medium hover:text-primary">
            Eventos
          </Link>
          <Link to="/community" className="text-sm font-medium hover:text-primary">
            Comunidad
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="sm" className="flex items-center space-x-2">
              <Github className="w-4 h-4" />
              <span>Iniciar Sesión</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};