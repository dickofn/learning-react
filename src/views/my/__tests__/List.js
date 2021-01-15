import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";
import PokemonContext from "../../../contexts/PokemonsContext";
import List from "../List";

const MyPokemons = [{ name: "bulbasaur", nickname: "bulbapet" }];

test("renders page my/list", async () => {
  render(
    <Router>
      <PokemonContext.Provider value={MyPokemons}>
        <MockedProvider>
          <List />
        </MockedProvider>
      </PokemonContext.Provider>
    </Router>
  );
});
