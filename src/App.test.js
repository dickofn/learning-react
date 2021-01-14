import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app", () => {
  render(<App />);

  const title = screen.getByText("Maybe Pokedex");
  const navigation = screen.getByRole("navigation");
  
  expect(title).toBeInTheDocument();
  expect(navigation).toBeInTheDocument();
});
