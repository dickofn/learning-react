import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import Loader from "../components/Loader";

function Product() {
  const { id } = useParams();

  const GET_POKEMON = gql`
    query pokemon($name: String!) {
      pokemon(name: $name) {
        id
        name
        sprites {
          front_default
        }
        moves {
          move {
            name
          }
        }
        types {
          type {
            name
          }
        }
        height
        weight
      }
    }
  `;

  const gqlVariables = {
    name: id,
  };

  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: gqlVariables,
  });

  let content = null;

  if (loading) {
    content = <Loader />;
  }

  if (error) {
    content = <div className="text-red-500"> {id} is not registered yet</div>;
  }

  if (data) {
    content = (
      <div>
        <h1 className="text-2xl font-bold mb-3 uppercase text-center">
          {data.pokemon.name}
        </h1>

        <div>
          <img
            src={data.pokemon.sprites.front_default}
            alt={data.pokemon.name}
            className="mx-auto"
          />
        </div>

        <div className="font-bold text-xl mb-3">{data.pokemon.weight} kg</div>

        <div>{data.pokemon.height} m</div>
      </div>
    );
  }

  return <div>{content}</div>;
}

export default Product;
