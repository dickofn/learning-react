import { render, screen } from "@testing-library/react";

import Loader from "../Loader";

test("renders component loader", () => {
  render(<Loader />);
  const loader = screen.getByTestId("loaderSpinner");

  expect(loader).toBeInTheDocument();
});
