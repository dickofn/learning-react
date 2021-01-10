import { useParams } from "react-router-dom";

import Loader from "../components/Loader";
import { gql, useQuery } from '@apollo/client';

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
    "name": "ditto"
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
    const product = data.pokemon;

    content = (
      <div>
        <h1 className="text-2xl font-bold mb-3 uppercase text-center">
          {product.name}
        </h1>

        <div>
          <img
            src={product.sprites.front_default}
            alt={product.name}
            className="mx-auto"
          />
        </div>

        <div className="font-bold text-xl mb-3">{product.weight} kg</div>

        <div>{product.height} m</div>
      </div>
    );
  }

  return <div>{content}</div>;
}

export default Product;
