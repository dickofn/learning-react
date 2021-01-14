import { render } from "@testing-library/react";

import Loader from "../Loader";

test("renders component loader", () => {
  const { container } = render(<Loader />);
  const loaderClass = container.firstChild.firstChild.classList.value;

  expect(loaderClass).toContain("Loader");
});
