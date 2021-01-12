import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { gql, useQuery } from "@apollo/client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faGem as farGem } from "@fortawesome/free-regular-svg-icons";

/** @jsxImportSource @emotion/react */
import { css, ClassNames } from "@emotion/react";
import {
  getColorByType,
  getContrastTextColorByType,
} from "../helper/pokemon-helper";

import Loader from "../components/Loader";
import Summary from "../components/pokemon/Summary";
import Move from "../components/pokemon/Move";

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
    content = (
      <div className="text-red-500">There's an error found, try refreshing</div>
    );
  }

  const [isShiny, setIsShiny] = useState(false);

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
          <div className="px-4">
            <h1
              className="relative -mx-4 py-3 text-2xl font-bold mb-3 uppercase text-center"
              css={cx(css(contrastTextStyle), css(bgPokemonType))}
            >
              <div className="absolute left-0 top-0 bottom-0 flex items-center ml-4">
                <Link to="/">
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    css={contrastTextStyle}
                  />
                </Link>
              </div>
              {data.pokemon.name}
            </h1>

            <div className="mb-4">
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
            <div className="text-right mb-4">
              <button
                onClick={() => setIsShiny(!isShiny)}
                className="rounded-full py-3 px-6 transition-all duration-200 focus:outline-none focus:bg-opacity-90 hover:bg-opacity-90"
                css={cx(css(contrastTextStyle), css(bgPokemonType))}
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

            <Tabs
              selectedTabClassName={cx(
                css(contrastTextStyle),
                css(bgPokemonType),
                " border-b-0"
              )}
              selectedTabPanelClassName={cx(
                css(borderPokemonType),
                "border mt-2 rounded px-4"
              )}
            >
              <TabList className="flex font-medium">
                <Tab
                  className={cx(
                    css(borderPokemonType),
                    "w-1/2 border py-3 rounded text-center mr-1"
                  )}
                >
                  Summary
                </Tab>
                <Tab
                  className={cx(
                    css(borderPokemonType),
                    "w-1/2 border py-3 rounded text-center ml-1"
                  )}
                >
                  Moves
                </Tab>
              </TabList>

              <TabPanel>
                <Summary data={data.pokemon} />
              </TabPanel>
              <TabPanel>
                <Move data={data.pokemon} />
              </TabPanel>
            </Tabs>
          </div>
        )}
      </ClassNames>
    );
  }

  return <div>{content}</div>;
}

export default Pokemon;
