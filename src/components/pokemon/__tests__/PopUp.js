import { render, screen } from "@testing-library/react";
import PopUp from "../PopUp";

test("renders component pokemon->popup (catch)", () => {
  render(<PopUp name="test" />); // Name bind (unprocessed)

  const name = screen.getByText("You caught a TEST"); // Name bind (processed)
  const input = screen.getByLabelText("Give it a nickname*");
  const button = screen.getByText("Submit");

  expect(name).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("renders component pokemon->popup (nothing)", () => {
  render(<PopUp name="01" />); // Name bind (01 means nothing)

  const name = screen.getByText("You catch nothing"); // Name bind (01 means nothing)
  const button = screen.getByText("Close");

  expect(name).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("renders component pokemon->popup (release)", () => {
  render(<PopUp isMy={true} />); // Name bind (unprocessed)

  const title = screen.getByText("Are you sure?"); // Name bind (processed)
  const buttonRelease = screen.getByText("Release");
  const buttonClose = screen.getByText("Close");

  expect(title).toBeInTheDocument();
  expect(buttonRelease).toBeInTheDocument();
  expect(buttonClose).toBeInTheDocument();
});
