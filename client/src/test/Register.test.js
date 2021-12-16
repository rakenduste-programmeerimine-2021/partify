import Register from "../components/Register";
import { render } from "./test-utils";
import { screen } from "@testing-library/react";

test("renders register, searches for title", () => {
  render(<Register />);
  const linkElement = screen.getByText("Register to the party!");
  expect(linkElement).toBeInTheDocument();
});
