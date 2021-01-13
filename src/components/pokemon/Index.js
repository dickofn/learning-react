import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

/** @jsxImportSource @emotion/react */
import { ClassNames, css } from "@emotion/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faGem } from "@fortawesome/free-solid-svg-icons";
import { faGem as farGem } from "@fortawesome/free-regular-svg-icons";

import {
  getColorByType,
  getContrastTextColorByType,
} from "../../helper/pokemon-helper";

import imgPokeball from "../../assets/pokeball.png";
import Summary from "./Summary";
import Move from "./Move";

function Index(props) {
  const pokemonType = props.pokemon.types[0].type.name;

  const contrastTextStyle = css`
    color: ${getContrastTextColorByType(pokemonType)};
  `;

  const bgPokemonType = css`
    background-color: ${getColorByType(pokemonType)};
  `;

  const borderPokemonType = css`
    border-color: ${getColorByType(pokemonType)};
  `;

  const [isShiny, setIsShiny] = useState(false);

  function CatchButton() {
    return (
      <button
        onClick={() => props.catchClicked(props.pokemon.name)}
        className="rounded-full py-3 px-6 transition-all duration-200 focus:outline-none bg-gray-800 text-white"
      >
        <div className="flex justify-center items-center">
          <img src={imgPokeball} alt="Pokeball" className="h-6 w-6 mr-2"></img>
          <div className="font-bold">Catch</div>
        </div>
      </button>
    );
  }

  function ReleaseButton() {
    return (
      <button
        onClick={() => props.releaseClicked(props.nickname)}
        className="rounded-full py-3 px-6 transition-all duration-200 focus:outline-none bg-red-800 text-white"
      >
        <div className="flex justify-center items-center">
          <img src={imgPokeball} alt="Pokeball" className="h-6 w-6 mr-2"></img>
          <div className="font-bold">Release</div>
        </div>
      </button>
    );
  }

  return (
    <ClassNames>
      {({ css, cx }) => (
        <div className="px-4">
          <h1
            className="relative -mx-4 py-3 text-2xl font-bold mb-3 uppercase text-center"
            css={cx(css(contrastTextStyle), css(bgPokemonType))}
          >
            <div className="absolute left-0 top-0 bottom-0 flex items-center ml-4">
              <Link
                to={
                  props.isMy
                    ? "/my"
                    : `/${
                        props.fromOffset ? "?offset=" + props.fromOffset : ""
                      }`
                }
              >
                <FontAwesomeIcon icon={faChevronLeft} css={contrastTextStyle} />
              </Link>
            </div>
            {props.pokemon.name} {props.isMy ? `(${props.nickname})` : ""}
          </h1>

          <div className="mx-auto w-full max-w-screen-sm">
            <div className="mb-4">
              <div className="relative h-40 w-40 mx-auto">
                <img
                  src={props.pokemon.sprites.front_default}
                  alt={props.pokemon.name}
                  className={
                    "absolute top-0 left-0 right-0 bottom-0 mx-auto h-40 w-40  transition-all duration-200 " +
                    (isShiny ? "opacity-0" : "")
                  }
                />
                <img
                  src={props.pokemon.sprites.front_shiny}
                  alt={props.pokemon.name}
                  className={
                    "absolute top-0 left-0 right-0 bottom-0 mx-auto h-40 w-40 transition-all duration-200 " +
                    (isShiny ? "" : "opacity-0")
                  }
                />
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              {props.isMy ? <ReleaseButton /> : <CatchButton />}
              <button
                onClick={() => setIsShiny(!isShiny)}
                className="rounded-full py-3 px-6 transition-all duration-200 focus:outline-none"
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
                <Summary data={props.pokemon} />
              </TabPanel>
              <TabPanel>
                <Move data={props.pokemon} />
              </TabPanel>
            </Tabs>
          </div>
        </div>
      )}
    </ClassNames>
  );
}

export default Index;
