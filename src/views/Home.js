import { Link, useLocation } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

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

  const urlQuery = new URLSearchParams(useLocation().search);

  const offset = urlQuery.get("offset") * 1 || 0;
  const perPage = 20;

  let nextOffset = 0;
  let prevOffset = 0;

  const gqlVar = {
    limit: perPage,
    offset: offset,
  };

  const { loading, data, error } = useQuery(GET_POKEMONS, {
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
    nextOffset = data.pokemons.nextOffset;
    prevOffset = data.pokemons.prevOffset;

    let prevBtn;
    let nextBtn;

    if (offset === 0) {
      prevBtn = (
        <div className="text-gray-400 border border-gray-400 rounded-full h-10 w-10 flex justify-center items-center">
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
      );
    } else {
      prevBtn = (
        <Link to={"/?offset=" + prevOffset} className="text-gray-900 border border-gray-900 rounded-full h-10 w-10 flex justify-center items-center">
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
      );
    }

    if (nextOffset === 0) {
      nextBtn = (
        <div className="text-gray-400 border border-gray-400 rounded-full h-10 w-10 flex justify-center items-center">
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      );
    } else {
      nextBtn = (
        <Link to={"/?offset=" + nextOffset} className="text-gray-900 border border-gray-900 rounded-full h-10 w-10 flex justify-center items-center">
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      );
    }

    content = (
      <div>
        <div className="mb-5">
          {data.pokemons.results.map((i) => (
            <div key={i.url}>
              <PokemonListCard pokemon={i} />
            </div>
          ))}
        </div>
        <div className="flex justify-between px-20">
          {prevBtn} {nextBtn}
        </div>
      </div>
    );
  }

  return <div className="p-4">{content}</div>;
}

export default Home;
