import { Link } from "react-router-dom";

export const NavLink = ({ to, children, className = "" }) => (
  <Link
    to={to}
    className={`text-sm font-medium hover:text-primary ${className}`}
  >
    {children}
  </Link>
);
