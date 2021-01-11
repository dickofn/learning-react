import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { gql, useQuery } from "@apollo/client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem } from "@fortawesome/free-solid-svg-icons";
import { faGem as farGem } from "@fortawesome/free-regular-svg-icons";

/** @jsxImportSource @emotion/react */
import { css, ClassNames } from "@emotion/react";
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
        <div className="text-center mb-4">
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

        <ClassNames>
          {({ css, cx }) => (
            <Tabs
              selectedTabClassName={cx(
                css(contrastTextStyle),
                `bg-${pokemonType} border-b-0`
              )}
              selectedTabPanelClassName={
                "border mt-2 rounded px-4  border-" + pokemonType
              }
            >
              <TabList className="flex font-medium">
                <Tab
                  className={
                    "w-1/3 border py-3 rounded text-center border-" +
                    pokemonType
                  }
                >
                  Summary
                </Tab>
                <Tab
                  className={
                    "w-1/3 border py-3 rounded text-center mx-2 border-" +
                    pokemonType
                  }
                >
                  Moves
                </Tab>
                <Tab
                  className={
                    "w-1/3 border py-3 rounded text-center border-" +
                    pokemonType
                  }
                >
                  Evolution
                </Tab>
              </TabList>

              <TabPanel>
                <div>Any content 1</div>
              </TabPanel>
              <TabPanel>
                <div>Any content 2</div>
              </TabPanel>
              <TabPanel>
                <div>Any content 3</div>
              </TabPanel>
            </Tabs>
          )}
        </ClassNames>
      </div>
    );
  }

  return <div>{content}</div>;
}

export default Pokemon;
