import Settings from "../components/Settings";
import { render } from "./test-utils";
import { screen } from "@testing-library/react";

test("renders settings", () => {
  render(<Settings />);
  screen.debug();
});
