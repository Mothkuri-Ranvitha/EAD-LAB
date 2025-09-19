import {useState} from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
    <h2>This is Counter application using react</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <br />
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <br />
      <button onClick={() => setCount(0)}>Reset</button>
      <br />
    </>
  );
}
export default Counter;
