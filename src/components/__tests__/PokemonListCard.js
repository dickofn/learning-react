import { render, screen, waitFor } from "@testing-library/react";
import { gql } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import PokemonListCard from "../PokemonListCard";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/learning-react/",
  }),
}));

const mocksSuccess = [
  {
    request: {
      query: gql`
        query pokemon($name: String!) {
          pokemon(name: $name) {
            types {
              type {
                name
              }
            }
            sprites {
              front_default
            }
          }
        }
      `,
      variables: {
        name: "bulbasaur",
      },
    },
    result: {
      data: {
        pokemon: {
          name: "bulbasaur",
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
          sprites: {
            front_default: "/some/img/link",
          },
        },
      },
    },
  },
];

test("renders componen pokemon-list-card success", async () => {
  render(
    <Router>
      <MockedProvider mocks={mocksSuccess}>
        <PokemonListCard pokemon={{ name: "bulbasaur" }} />
      </MockedProvider>
    </Router>
  );

  const loader = screen.getByTestId("loaderSpinner");

  expect(loader).toBeInTheDocument();

  await waitFor(() => {
    expect(loader).not.toBeInTheDocument();

    const pokemonName = screen.getByText("bulbasaur");
    expect(pokemonName).toBeInTheDocument();
  });
});

const mocksError = [
  {
    request: {
      query: gql`
        query pokemon($name: String!) {
          pokemon(name: $name) {
            types {
              type {
                name
              }
            }
            sprites {
              front_default
            }
          }
        }
      `,
      variables: {
        name: "bulbasaur",
      },
    },
    error: new Error()
  },
];

test("renders componen pokemon-list-card error", async () => {
  render(
    <Router>
      <MockedProvider mocks={mocksError}>
        <PokemonListCard pokemon={{ name: "bulbasaur" }} />
      </MockedProvider>
    </Router>
  );

  const loader = screen.getByTestId("loaderSpinner");

  expect(loader).toBeInTheDocument();

  await waitFor(() => {
    expect(loader).not.toBeInTheDocument();

    const pokemonName = screen.getByText("There's an error found, try refreshing");
    expect(pokemonName).toBeInTheDocument();
  });
});