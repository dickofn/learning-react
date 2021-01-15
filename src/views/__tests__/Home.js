import { render, screen, waitFor } from "@testing-library/react";
import { gql } from "@apollo/client";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../Home";

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
      `,
      variables: {
        limit: 20,
        offset: 0,
      },
    },
    result: {
      data: {
        pokemons: {
          nextOffset: 20,
          prevOffset: 0,
          results: [
            {
              name: "bulbasaur",
              id: 1,
            },
            {
              name: "ivysaur",
              id: 2,
            },
            {
              name: "venusaur",
              id: 3,
            },
          ],
        },
      },
    },
  },
];

test("renders page home success", async () => {
  render(
    <Router>
      <MockedProvider mocks={mocksSuccess}>
        <Home />
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

test("renders page home error", async () => {
  render(
    <Router>
      <MockedProvider mocks={mocksError}>
        <Home />
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
