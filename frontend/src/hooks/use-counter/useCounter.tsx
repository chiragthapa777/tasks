import { useState } from "react";

export const useCounter = ({ initialCount = 0 }: { initialCount?: number }) => {
  const [count, setCount] = useState(initialCount);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  return { count, increment, decrement };
};
