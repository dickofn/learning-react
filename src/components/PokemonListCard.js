import { Link, useLocation } from "react-router-dom";

function PokemonListCard(props) {
  const urlQuery = new URLSearchParams(useLocation().search);

  const offset = urlQuery.get("offset") * 1 || 0;

  const pokemon = props.pokemon;

  return (
    <div className="border border-gray-900 mb-4 rounded">
      <Link to={`/pokemon/${pokemon.name}?fromOffset=${offset}`}>
        <div className="border-b border-gray-900 uppercase font-medium p-3 text-center relative">
          {pokemon.name}
          <span className="absolute top-0 left-0 bottom-0 p-3">
            #{pokemon.id}
          </span>
        </div>
        <img src={pokemon.image} alt={pokemon.name} className="mx-auto" />
      </Link>
    </div>
  );
}

export default PokemonListCard;
