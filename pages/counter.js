import React, { useState } from 'react';

export default function MyApp() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counters { count } times</h1>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}