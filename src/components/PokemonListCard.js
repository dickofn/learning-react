import { Link, useLocation } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

/** @jsxImportSource @emotion/react */
import { css, ClassNames } from "@emotion/react";
import {
  getColorByType,
  getContrastTextColorByType,
} from "../helper/pokemon-helper";

import Loader from "./Loader";

function PokemonListCard(props) {
  const urlQuery = new URLSearchParams(useLocation().search);

  const offset = urlQuery.get("offset") * 1 || 0;

  const pokemon = props.pokemon;

  const GET_POKEMON = gql`
    query pokemon($name: String!) {
      pokemon(name: $name) {
        types {
          type {
            name
          }
        }
        sprites {
          front_default
        }
      }
    }
  `;

  const gqlVariables = {
    name: pokemon.name,
  };

  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: gqlVariables,
  });

  let content = "";

  if (loading) {
    content = (
      <div className="p-4 border border-gray-900 mb-4 rounded">
        <Loader />
      </div>
    );
  }

  if (error) {
    content = (
      <div className="text-red-500">There's an error found, try refreshing</div>
    );
  }

  if (data) {
    const pokemonType = data.pokemon.types[0].type.name;

    const contrastTextStyle = css`
      color: ${getContrastTextColorByType(pokemonType)};
    `;

    const bgPokemonType = css`
      background-color: ${getColorByType(pokemonType)};
    `;

    const borderPokemonType = css`
      border-color: ${getColorByType(pokemonType)};
    `;

    content = (
      <ClassNames>
        {({ css, cx }) => (
          <div
            className="border mb-4 rounded"
            css={cx(css(borderPokemonType), css(contrastTextStyle))}
          >
            <Link to={`/pokemon/${pokemon.name}?fromOffset=${offset}`}>
              <div
                className="border-b uppercase font-medium p-3 text-center relative"
                css={cx(css(borderPokemonType), css(bgPokemonType))}
              >
                {pokemon.name}
                <span className="absolute top-0 left-0 bottom-0 p-3">
                  #{pokemon.id}
                </span>
              </div>
              <img
                src={data.pokemon.sprites.front_default}
                alt={pokemon.name}
                className="mx-auto text-gray-900"
              />
            </Link>
          </div>
        )}
      </ClassNames>
    );
  }

  return <div>{content}</div>;
}

export default PokemonListCard;
