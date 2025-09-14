import { useEffect, useState } from "react";

const generateResultPattern = (size) => {
  let result = [];
  for (let i = 0; i < size; i++) {
    let horizontal = [];
    let vertical = [];
    for (let j = 0; j < size; j++) {
      horizontal.push(size * i + j);
      vertical.push(size * j + i);
    }
    result.push(horizontal, vertical);
  }

  let dig1 = [];
  let dig2 = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (i == j) {
        dig1.push(size * i + j);
      }
      if (i == size - j - 1) {
        dig2.push(size * i + j);
      }
    }
  }
  result.push(dig1, dig2);

  return result;
};

function TicToe({ size = 3 }) {
  const array = Array(size * size).fill(null);
  const [winner, setWinner] = useState("");
  const [buttonArray, setButtonArray] = useState(array);
  const [xturn, setXturn] = useState(true);
  const [playerInputs, setPlayerInputs] = useState({
    X: [],
    O: [],
  });
  const [reultPattern, setReultPattern] = useState([]);
  const [count, setCount] = useState(0);
  const [draw, setDraw] = useState(false);

  useEffect(() => {
    setReultPattern(generateResultPattern(size));
  }, [size]);

  useEffect(() => {
    if (count === size * size && !winner) {
      setDraw(true);
    }
  }, [size, count, winner]);

  const winnerCalculations = (player, arr) => {
    setCount((prev) => prev + 1);
    reultPattern.forEach((element) => {
      const winarr = arr.sort().filter((e) => element.includes(e));

      if (winarr.sort().toString() === element.sort().toString())
        setWinner(player);
    });
  };

  const handleButtonClick = (indexV) => {
    const updatedButtonArray = buttonArray.map((value, index) => {
      if (index === indexV) {
        value = xturn ? "X" : "O";
        setPlayerInputs((prev) => {
          const arr = [...prev[value], indexV];
          winnerCalculations(value, arr);
          return {
            ...prev,
            [value]: arr,
          };
        });

        setXturn((prev) => !prev);
      }
      return value;
    });
    setButtonArray(updatedButtonArray);
  };

  const handleReset = () => {
    setButtonArray(array);
    setXturn(true);
    setWinner("");
    setPlayerInputs({ ...playerInputs, X: [], O: [] });
    setCount(0);
    setDraw(false);
  };

  return (
    <div className="app" style={{ "--gridsize": size }}>
      <h1>Tic Tac Toe</h1>
      {draw ? (
        <p>Draw</p>
      ) : winner ? (
        <p>{winner} is the Winner</p>
      ) : (
        <p>{xturn ? "X" : "O"} Turn</p>
      )}
      <button onClick={handleReset}>Reset</button>
      <div className="tic-tac-body">
        {buttonArray.map((value, index) => {
          return (
            <button
              className="grid-btn"
              disabled={winner || value}
              onClick={() => handleButtonClick(index)}
              key={index}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TicToe;
