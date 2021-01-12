import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="border-b border-gray-900 p-3 flex justify-between items-center">
      <Link className="font-bold uppercase font-mono" to="/">Maybe Pokedex</Link>
    </header>
  );
}

export default Header;
