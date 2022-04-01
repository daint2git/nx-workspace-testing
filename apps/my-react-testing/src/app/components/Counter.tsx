import { useEffect, useState } from 'react';

type Props = {
  defaultCount: number;
  description: string;
};

export default function Counter({ defaultCount = 0, description }: Props) {
  const [count, setCount] = useState(defaultCount);
  const [incrementor, setIncrementor] = useState(1);
  const [bigEnough, setBigEnough] = useState(defaultCount >= 15);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (count >= 15) {
      timeout = setTimeout(() => {
        setBigEnough(true);
      }, 200);
    }

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div>
      <h2>Counter</h2>
      <p>Description: {description}</p>
      <p>Default count: {defaultCount}</p>
      <label htmlFor="xxx">
        Incrementor:
        <input
          type="number"
          name="incrementor"
          id="xxx"
          value={incrementor}
          onChange={(e) => setIncrementor(parseInt(e.target.value) || 0)}
        />
      </label>
      <div>
        <button onClick={() => setCount(count - incrementor)}>-</button>
        <span>Count: {count}</span>
        <button
          aria-label="Increment"
          onClick={() => setCount(count + incrementor)}
        >
          +
        </button>
        <button
          aria-label="Async Increment"
          onClick={() => setTimeout(() => setCount(count + incrementor), 100)}
        >
          + (Async)
        </button>
      </div>

      {bigEnough ? null : <div>I am too small</div>}
    </div>
  );
}
