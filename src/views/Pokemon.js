import { useState } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem } from "@fortawesome/free-solid-svg-icons";
import { faGem as farGem } from "@fortawesome/free-regular-svg-icons";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { getContrastTextColorByType } from "../helper/pokemon-helper";

import Loader from "../components/Loader";

function Pokemon() {
  const { id } = useParams();

  const GET_POKEMON = gql`
    query pokemon($name: String!) {
      pokemon(name: $name) {
        id
        name
        height
        weight
        types {
          type {
            name
          }
        }
        stats {
          stat {
            name
          }
          base_stat
        }
        sprites {
          front_default
          front_shiny
        }
        abilities {
          ability {
            name
          }
        }
        moves {
          move {
            name
          }
        }
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

  const [isShiny, setIsShiny] = useState(false);

  if (data) {
    const pokemonType = data.pokemon.types[0].type.name;

    const contrastTextStyle = css`
      color: ${getContrastTextColorByType(pokemonType)};
    `;

    content = (
      <div className="px-4">
        <h1
          className={
            "-mx-4 py-3 text-2xl font-bold mb-3 uppercase text-center text-white bg-" +
            pokemonType
          }
          css={contrastTextStyle}
        >
          {data.pokemon.name}
        </h1>

        <div>
          <img
            src={
              isShiny
                ? data.pokemon.sprites.front_shiny
                : data.pokemon.sprites.front_default
            }
            alt={data.pokemon.name}
            className="mx-auto h-40 w-40"
          />
        </div>

        <div className="text-center">
          <button
            onClick={() => setIsShiny(!isShiny)}
            className={
              "rounded-full py-3 px-5 flex justify-center items-center ml-auto transition-all duration-200 focus:outline-none hover:bg-opacity-90 bg-" +
              pokemonType
            }
            css={contrastTextStyle}
          >
            <div className="flex justify-center items-center">
              <FontAwesomeIcon
                icon={isShiny ? faGem : farGem}
                className="text-2xl mr-2"
              />
              <div className="font-bold">Shiny</div>
            </div>
          </button>
        </div>

        <div className="font-bold text-xl mb-3">{data.pokemon.weight} kg</div>

        <div>{data.pokemon.height} m</div>
      </div>
    );
  }

  return <div>{content}</div>;
}

export default Pokemon;
