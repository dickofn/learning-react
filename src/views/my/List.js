import { useContext } from "react";
import PokemonListCard from "../../components/PokemonListCard";

import PokemonContext from "../../contexts/PokemonsContext";

function List() {
  const pokemons = useContext(PokemonContext);

  return (
    <div className="p-4">
      <div className="mb-5">
        {pokemons.map((i) => (
          <div key={i.nickname}>
            <PokemonListCard pokemon={i} isMy={true} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
