import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="relative lg:fixed lg:z-10 lg:w-full bg-gray-800 text-white p-4 text-center lg:text-left lg:flex lg:justify-between lg:items-center ">
      <Link className="font-bold uppercase font-mono text-xl" to="/">
        Maybe Pokedex
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;
