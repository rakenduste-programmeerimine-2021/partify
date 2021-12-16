import AddPost from "../components/AddPost";
import { render } from "./test-utils";
import { screen } from "@testing-library/react";

test("renders addpost, searches for title", () => {
  render(<AddPost />);
  const linkElement = screen.getByText("Title");
  expect(linkElement).toBeInTheDocument();
});
