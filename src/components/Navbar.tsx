import { useState } from "react";
import { Menu, X, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
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
    </>
  );

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-display text-xl font-bold">Laguna Devs</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavLinks />
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <div className="flex flex-col space-y-4 mt-8">
              <NavLinks />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};