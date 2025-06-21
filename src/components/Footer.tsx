import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="app-footer">
      <span>© 2025</span>
      <Link to={`/about`}>About</Link>
    </footer>
  );
};
