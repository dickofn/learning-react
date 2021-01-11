import { Link } from "react-router-dom";
import Navigation from "./Navigation";

function Header() {
  return (
    <header className="border-b p-3 flex justify-between items-center">
      <Link className="font-bold uppercase font-mono" to="/">Maybe Pokedex</Link>
      <Navigation />
    </header>
  );
}

export default Header;
