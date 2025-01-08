import { Link, useLocation } from "react-router-dom";
import { Users, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

export const AdminNav = () => {
  const location = useLocation();

  const links = [
    {
      href: "/admin/events",
      label: "Eventos",
      icon: CalendarDays,
    },
    {
      href: "/admin/users",
      label: "Usuarios",
      icon: Users,
    },
  ];

  return (
    <nav className="flex gap-4">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          to={href}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
            location.pathname === href
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          <Icon className="w-4 h-4" />
          {label}
        </Link>
      ))}
    </nav>
  );
};