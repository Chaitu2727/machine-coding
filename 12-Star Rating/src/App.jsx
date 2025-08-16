import { useState } from "react";
import "./App.css";
import StarRating from "./components/star-rating";

function App() {
  const [rating, setRating] = useState(0);
  const changeHandler = (currentRating) => {
    setRating(currentRating);
  };
  return (
    <div>
      <h1>Star Rating</h1>
      <StarRating size={5} rating={rating} onChange={changeHandler} />
      <p>Current rating is : {rating}</p>
    </div>
  );
}

export default App;
