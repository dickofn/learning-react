import { gql, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../../components/Loader";

import PokemonDetail from "../../components/pokemon/Index";
import PopUp from "../../components/pokemon/PopUp";

import PokemonContext from "../../contexts/PokemonsContext";

function Detail() {
  const { nickname } = useParams();
  const pokemons = useContext(PokemonContext);

  const name = pokemons.filter((i) => i.nickname === nickname)[0].name;

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
    name,
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
        isMy={true}
        nickname={nickname}
        releaseClicked={(payload) => releaseEm(payload)}
      ></PokemonDetail>
    );
  }

  const [popUp, setPopUp] = useState(null);

  function releaseEm(nickname) {
    setPopUp(nickname);
  }

  const history = useHistory();

  function doRelease() {
    const index = pokemons.map((i) => i.nickname).indexOf(nickname);
    pokemons.splice(index, 1);

    localStorage.setItem(
      "pokemons",
      JSON.stringify(pokemons.filter((i) => i.nickname !== popUp))
    );

    history.push("/my");
  }

  return (
    <div>
      {popUp ? (
        <PopUp
          name={popUp}
          isMy={true}
          toggle={() => setPopUp(false)}
          release={() => doRelease()}
        />
      ) : null}
      {content}
    </div>
  );
}

export default Detail;
