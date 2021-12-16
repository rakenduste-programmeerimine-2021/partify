import PostView from "../components/PostView";
import { render } from "./test-utils";
import { screen } from "@testing-library/react";

test("renders postview", () => {
  render(<PostView />);
  screen.debug()

});
