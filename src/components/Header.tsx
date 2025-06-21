import { HashLink } from "react-router-hash-link";
import "./Header.css";

export const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <HashLink smooth to="/" className="band-link">
          NAC
        </HashLink>
      </div>
      <nav className="bands">
        <HashLink smooth to="/#50 MHz" className="band-link">
          50
        </HashLink>
        <HashLink smooth to="/#144 MHz" className="band-link">
          144
        </HashLink>
        <HashLink smooth to="/#432 MHz" className="band-link">
          432
        </HashLink>
        <HashLink smooth to="/#1296 MHz" className="band-link">
          1296
        </HashLink>
      </nav>
    </header>
  );
};
