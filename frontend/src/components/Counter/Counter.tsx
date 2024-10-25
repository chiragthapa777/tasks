import { useState } from "react";

type Props = {};

export default function Counter({}: Props) {
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState(0);
  return (
    <div>
      <h1>{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        add
      </button>
      <input
        type="number"
        name="amount"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <button
        onClick={() => {
          setCount(amount);
        }}
      >
        set
      </button>
    </div>
  );
}
