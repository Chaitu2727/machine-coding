import { useState } from "react";
import "./App.css";
import TicToe from "./components/TicToe";

function App() {
  const [boardsize, setBoardsize] = useState(3);
  return (
    <div className="app">
      <div className="board-size">
        <label htmlFor="size">Enter board size</label>
        <select
          name=""
          id="size"
          onChange={(e) => setBoardsize(e.target.value)}
        >
          {Array.from({ length: 5 })
            .map((_, i) => i + 3)
            .map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>
      </div>
      <TicToe size={boardsize} />
    </div>
  );
}

export default App;
