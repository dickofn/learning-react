import { Link } from "react-router-dom";

function Navigation() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around z-10">
      <Link
        to="/"
        className="font-mono uppercase tracking-widest w-1/2 text-center p-5 bg-gray-800 text-white border-r border-gray-900"
      >
        Pokemons
      </Link>
      <Link
        to="/my"
        className="font-mono uppercase tracking-widest w-1/2 text-center p-5 bg-gray-800 text-white"
      >
        My Pokemons
      </Link>
    </div>
  );
}

export default Navigation;
