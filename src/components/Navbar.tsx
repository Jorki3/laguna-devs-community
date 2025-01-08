// Navbar.tsx
import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { NavLinks } from "./ui/nav/NavLinks";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        getProfile(session.user.id);
      }
    });
  }, []);

  const getProfile = async (userId) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    setProfile(data);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-display text-xl font-bold">Laguna Devs</span>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <NavLinks
            session={session}
            profile={profile}
            handleSignOut={handleSignOut}
          />
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px]">
            <div className="flex flex-col space-y-4 mt-8">
              <NavLinks
                session={session}
                profile={profile}
                handleSignOut={handleSignOut}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};
