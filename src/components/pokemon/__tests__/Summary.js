import { render, screen } from "@testing-library/react";
import Summary from "../Summary";

test("renders component pokemon->summary", () => {
  const dummies = {
    types: [
      {
        type: {
          name: "grass",
        },
      },
      {
        type: {
          name: "fire",
        },
      },
    ],
    stats: [
      {
        stat: {
          name: "st-1", // Stats title bind (unprocessed)
        },
        base_stat: 10,
      },
      {
        stat: {
          name: "st-2",
        },
        base_stat: 10,
      },
    ],
    height: 10,
    weight: 10,
  };

  render(<Summary data={dummies} />);

  const typesTitle = screen.getByText("Types");
  const statsTitle = screen.getByText("St 1"); // Stats title bind (processed)
  const heightTitle = screen.getByText("Height");
  const weightTitle = screen.getByText("Weight");

  expect(typesTitle).toBeInTheDocument();
  expect(statsTitle).toBeInTheDocument();
  expect(heightTitle).toBeInTheDocument();
  expect(weightTitle).toBeInTheDocument();
});
