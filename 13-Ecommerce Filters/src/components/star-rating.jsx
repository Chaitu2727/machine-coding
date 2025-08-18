import { useState } from "react";

const StarRating = ({ size = 5, rating = 3, onChange }) => {
  const [currentRating, setCurrentRating] = useState(0);
  const handleMouseEvent = (currentValue) => {
    setCurrentRating(currentValue);
  };
  return (
    <div className="star-rating">
      {Array(size)
        .fill("")
        .map((_, index) => {
          return (
            <span
              key={index}
              className={`${onChange && "star"} ${
                index + 1 <= currentRating && "hovered"
              } ${index + 1 <= rating && "star-active"}`}
              onMouseEnter={() => {
                if (onChange) handleMouseEvent(index + 1);
              }}
              onMouseLeave={() => {
                if (onChange) handleMouseEvent(0);
              }}
              onClick={() => onChange(index + 1)}
            >
              &#9733;
            </span>
          );
        })}
    </div>
  );
};

export default StarRating;
