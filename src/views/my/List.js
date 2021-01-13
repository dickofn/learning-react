import { useContext } from "react";
import PokemonListCard from "../../components/PokemonListCard";

import PokemonContext from "../../contexts/PokemonsContext";

function List() {
  const pokemons = useContext(PokemonContext);

  return (
    <div className="p-4">
      <div className="mb-5 md:flex md:flex-wrap">
        {pokemons.map((i) => (
          <div className="md:w-1/2 md:px-2 xl:w-1/4" key={i.nickname}>
            <PokemonListCard pokemon={i} isMy={true} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
