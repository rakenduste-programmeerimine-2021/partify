import Login from "../components/Login";
import { render } from "./test-utils";
import { screen } from "@testing-library/react";

test("renders login, searches for title", () => {
  render(<Login />);
  const linkElement = screen.getByText("Welcome to the party!");
  expect(linkElement).toBeInTheDocument();
});
