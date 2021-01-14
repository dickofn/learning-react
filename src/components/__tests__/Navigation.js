import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Navigation from "../Navigation";

test("renders component navigation", () => {
  render(
    <Router>
      <Navigation />
    </Router>
  );
  
  const allPokemonsNav = screen.getByText("Pokemons");
  const myPokemonsNav = screen.getByText("My Pokemons");

  expect(allPokemonsNav).toHaveAttribute("href", "/");
  expect(myPokemonsNav).toHaveAttribute("href", "/my");
});
