import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import Loader from "../components/Loader";
import PokemonListCard from "../components/PokemonListCard";

function Home() {
  const GET_POKEMONS = gql`
    query pokemons($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        count
        next
        previous
        nextOffset
        prevOffset
        status
        message
        results {
          url
          name
          image
        }
      }
    }
  `;

  const [gqlVar, setGqlVar] = useState({
    limit: 20,
    offset: 0,
  });

  setGqlVar({
    limit: 20,
    offset: 0,
  });

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVar,
  });

  let content = null;

  if (loading) {
    content = <Loader />;
  }

  if (error) {
    content = <div className="text-red-500"> Error </div>;
  }

  if (data) {
    content = data.pokemons.results.map((i) => (
      <div key={i.url}>
        <PokemonListCard pokemon={i} />
      </div>
    ));
  }

  return (
    <div>
      <h1 className="font-bold text-2xl mb-3">Best Sellers</h1>

      {content}
    </div>
  );
}

export default Home;
