import { act, renderHook } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

vitest.useFakeTimers();

describe("useDebounce", () => {
  test("should immediately set the initial value", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  test("should update value after delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delayMs }) => useDebounce(value, delayMs),
      {
        initialProps: { value: "initial", delayMs: 500 },
      }
    );
    rerender({ value: "updated", delayMs: 500 });
    expect(result.current).toBe("initial");
    act(() => {
      vitest.advanceTimersByTime(500);
    });
    expect(result.current).toBe("updated");
  });

  test("should reset timer if value changes quickly", () => {
    const { result, rerender } = renderHook(
      ({ value, delayMs }) => useDebounce(value, delayMs),
      {
        initialProps: { value: "initial", delayMs: 500 },
      }
    );
    rerender({ value: "intermediate", delayMs: 500 });
    act(() => {
      vitest.advanceTimersByTime(250);
    });
    rerender({ value: "final", delayMs: 500 });
    act(() => {
      vitest.advanceTimersByTime(500);
    });
    expect(result.current).toBe("final");
  });
});
