import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "../Header";

test("renders component header", () => {
  render(
    <Router>
      <Header />
    </Router>
  );
  const headerTitle = screen.getByText("Maybe Pokedex");
  const navigation = screen.getByRole("navigation");

  expect(headerTitle).toBeInTheDocument();
  expect(headerTitle).toHaveAttribute("href", "/");
  expect(navigation).toBeInTheDocument();
});
