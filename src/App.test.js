import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders main screen", () => {
  render(<App />);
  const title = screen.getByText(/maybe pokedex/i);
  expect(title).toBeInTheDocument();
});
