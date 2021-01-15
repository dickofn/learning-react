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
        nextOffset
        prevOffset
        results {
          name
          id
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
    content = (
      <div className="text-red-500">There's an error found, try refreshing</div>
    );
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
        <Link
          to={"/?offset=" + prevOffset}
          className="text-white bg-gray-800 rounded-full h-10 w-10 flex justify-center items-center"
        >
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
        <Link
          to={"/?offset=" + nextOffset}
          className="text-white bg-gray-800 rounded-full h-10 w-10 flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      );
    }

    content = (
      <div>
        <div className="mb-5 md:flex md:flex-wrap">
          {data.pokemons.results.map((i) => (
            <div className="md:w-1/2 md:px-2 xl:w-1/4" key={i.name}>
              <PokemonListCard pokemon={i} />
            </div>
          ))}
        </div>
        <div className="sticky xl:relative bottom-0 pb-20 lg:pb-5 flex justify-between px-20 md:w-10/12 lg:w-3/4 xl:w-1/2 md:mx-auto">
          {prevBtn} {nextBtn}
        </div>
      </div>
    );
  }

  return <div className="p-4 pb-2">{content}</div>;
}

export default Home;
