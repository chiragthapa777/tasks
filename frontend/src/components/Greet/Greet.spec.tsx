import { render, screen } from "@testing-library/react";
import Greet from "./Greet";
describe("Greet", () => {
  test("Greet rendered correctly", () => {
    render(<Greet />);
    const textElement = screen.getByText(/greet/i);
    expect(textElement).toBeInTheDocument();
  });

  test("Greet with name rendered correctly", () => {
    render(<Greet name="John" />);
    const textElement = screen.getByText(/greet john/i);
    expect(textElement).toBeInTheDocument();
  });
});
