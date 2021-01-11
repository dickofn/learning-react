import { Link } from "react-router-dom";

function PokemonListCard(props) {
  const pokemon = props.pokemon;

  return (
    <div className="border mb-4 rounded overflow-hidden">
      <Link to={`/pokemon/${pokemon.name}`}>
        <div className="uppercase font-medium p-3">{pokemon.name}</div>
        <img src={pokemon.image} alt={pokemon.name} />
      </Link>
    </div>
  );
}

export default PokemonListCard;
