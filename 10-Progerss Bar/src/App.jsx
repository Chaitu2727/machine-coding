import { useState } from "react";
import "./App.css";
import ProgresBar from "./components/ProgresBar";
import { useEffect } from "react";

function App() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setValue((val) => (val >= 100 ? 0 : val + 1)),
      100
    );
    return () => {
      clearInterval(interval);
    };
  }, [value]);

  return (
    <div className="app">
      <h1>Progress Bar</h1>
      <ProgresBar value={value} />
    </div>
  );
}

export default App;
