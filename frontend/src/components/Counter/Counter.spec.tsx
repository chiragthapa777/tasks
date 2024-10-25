import { render, screen } from "../../test-utils";
import Counter from "./Counter";
import user from "@testing-library/user-event";

describe("Counter", () => {
  test("render correctly", () => {
    render(<Counter />);
    const counterElement = screen.getByRole("heading");
    expect(counterElement).toBeInTheDocument();
    const incrementButton = screen.getByRole("button", {
      name: "add",
    });
    expect(incrementButton).toBeInTheDocument();
  });

  test("render a count of 0", () => {
    render(<Counter />);
    const counterElement = screen.getByRole("heading");
    expect(counterElement).toHaveTextContent("0");
  });

  test("renders the count of 1 after clicking the increment button", async () => {
    user.setup();

    render(<Counter />);

    const counterElement = screen.getByRole("heading");

    const incrementButton = screen.getByRole("button", {
      name: "add",
    });

    await user.click(incrementButton);

    expect(counterElement).toHaveTextContent("1");
  });

  test("renders a count of 10 after clicking the set button", async () => {
    user.setup();
    render(<Counter />);
    const amountInput = screen.getByRole("spinbutton");
    await user.type(amountInput, "10");
    expect(amountInput).toHaveValue(10);
    const setButton = screen.getByRole("button", {
      name: "set",
    });
    await user.click(setButton);
    const counterElement = screen.getByRole("heading");
    expect(counterElement).toHaveTextContent("10");
  });

  test("renders a count of 10 after clicking the set button", async () => {
    user.setup();
    render(<Counter />);
    const incrementButton = screen.getByRole("button", {
      name: "add",
    });
    const amountInput = screen.getByRole("spinbutton");
    const setButton = screen.getByRole("button", {
      name: "set",
    });
    await user.tab();
    expect(incrementButton).toHaveFocus();
    await user.tab();
    expect(amountInput).toHaveFocus();
    await user.tab();
    expect(setButton).toHaveFocus();
  });
});
