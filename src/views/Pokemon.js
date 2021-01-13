import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import Loader from "../components/Loader";
import PokemonDetail from "../components/pokemon/Index";
import PopUp from "../components/pokemon/PopUp";

function Pokemon() {
  const { id } = useParams();

  const urlQuery = new URLSearchParams(useLocation().search);

  const fromOffset = urlQuery.get("fromOffset") || null;

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
    content = (
      <div className="p-4">
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
    content = (
      <PokemonDetail
        pokemon={data.pokemon}
        fromOffset={fromOffset}
        catchClicked={(payload) => catchEm(payload)}
      ></PokemonDetail>
    );
  }

  const [popUp, setPopUp] = useState(null);

  function catchEm(name) {
    const random = Math.random() < 0.5;
    if (random) {
      setPopUp(name);
    } else {
      setPopUp("01");
    }
  }

  function closePopUp() {
    setPopUp(null);
  }

  return (
    <div>
      {popUp ? <PopUp name={popUp} toggle={() => closePopUp()} /> : null}
      {content}
    </div>
  );
}

export default Pokemon;
