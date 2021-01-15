import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Index from "../Index";

const pokemon = {
  id: 1,
  name: "bulbasaur",
  height: 7,
  weight: 69,
  types: [
    {
      type: {
        name: "grass",
      },
    },
    {
      type: {
        name: "poison",
      },
    },
  ],
  stats: [
    {
      stat: {
        name: "hp",
      },
      base_stat: 45,
    },
    {
      stat: {
        name: "attack",
      },
      base_stat: 49,
    },
  ],
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    front_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
  },
  abilities: [
    {
      ability: {
        name: "overgrow",
      },
    },
    {
      ability: {
        name: "chlorophyll",
      },
    },
  ],
  moves: [
    {
      move: {
        name: "razor-wind",
      },
    },
    {
      move: {
        name: "swords-dance",
      },
    },
  ],
};

test("renders component pokemon->index default", () => {
  render(
    <Router>
      <Index pokemon={pokemon} />
    </Router>
  );

  const name = screen.getByText("bulbasaur");
  const buttonCatch = screen.getByText("Catch");

  expect(name).toBeInTheDocument();
  expect(buttonCatch).toBeInTheDocument();
});

test("renders component pokemon->index my", () => {
  render(
    <Router>
      <Index pokemon={pokemon} isMy={true} nickname="bulbapet" />
    </Router>
  );

  const name = screen.getByText("bulbasaur (bulbapet)");
  const buttonRelease = screen.getByText("Release");

  expect(name).toBeInTheDocument();
  expect(buttonRelease).toBeInTheDocument();
});
