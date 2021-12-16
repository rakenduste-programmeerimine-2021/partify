import Profile from "../components/Profile";
import { render } from "./test-utils";
import { screen } from "@testing-library/react";

test("renders profile", () => {
  render(<Profile />);
  screen.debug();
});
