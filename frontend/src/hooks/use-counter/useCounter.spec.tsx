import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";
describe("useCounter", () => {
  test("should render the initial count", () => {
    const { result } = renderHook(useCounter, {
      initialProps: {
        initialCount: 1,
      },
    });
    expect(result.current.count).toBe(1);
  });

  test("should increment and decrement the counter", () => {
    const { result } = renderHook(useCounter, {
      initialProps: {
        initialCount: 1,
      },
    });
    expect(result.current.count).toBe(1);

    act(() => result.current.increment());

    expect(result.current.count).toBe(2);

    act(() => result.current.decrement());

    expect(result.current.count).toBe(1);
  });
});
