import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4 text-center">
      <Link className="font-bold uppercase font-mono text-xl" to="/">
        Maybe Pokedex
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;
