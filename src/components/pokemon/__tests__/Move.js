import { render, screen } from "@testing-library/react";
import Move from "../Move";

test("renders component pokemon->move", () => {
  const dummies = {
    abilities: [
      {
        ability: {
          name: "abl-1",
        },
      },
      {
        ability: {
          name: "abl-2",
        },
      },
    ],
    moves: [
      {
        move: {
          name: "mv-1",
        },
      },
      {
        move: {
          name: "mv-2",
        },
      },
    ],
  };

  render(<Move data={dummies} />);

  const abilitiesTitle = screen.getByText("Abilities");
  const movesTitle = screen.getByText("Moves");

  expect(abilitiesTitle).toBeInTheDocument();
  expect(movesTitle).toBeInTheDocument();
});
