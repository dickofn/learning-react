import { render, screen, waitFor } from "@testing-library/react";
import { gql } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import Pokemon from "../Pokemon";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/learning-react/pokemon/bulbasaur",
  }),
  useParams: () => ({
    id: "bulbasaur", // use params for variable
  }),
}));

const mocksSuccess = [
  {
    request: {
      query: gql`
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
      `,
      variables: {
        name: "bulbasaur",
      },
    },
    result: {
      data: {
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
      },
    },
  },
];

test("renders page pokemon success", async () => {
  render(
    <Router>
      <MockedProvider mocks={mocksSuccess}>
        <Pokemon />
      </MockedProvider>
    </Router>
  );

  const loader = screen.getByTestId("loaderSpinner");

  expect(loader).toBeInTheDocument();

  await waitFor(() => {
    expect(loader).not.toBeInTheDocument();
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
    error: new Error(),
  },
];

test("renders page pokemon error", async () => {
  render(
    <Router>
      <MockedProvider mocks={mocksError}>
        <Pokemon />
      </MockedProvider>
    </Router>
  );

  const loader = screen.getByTestId("loaderSpinner");

  expect(loader).toBeInTheDocument();

  await waitFor(() => {
    expect(loader).not.toBeInTheDocument();

    const errMsg = screen.getByText("There's an error found, try refreshing");
    expect(errMsg).toBeInTheDocument();
  });
});
