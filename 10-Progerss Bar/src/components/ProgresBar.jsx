import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ProgresBar = ({ value }) => {
  const [percentage, setPercentage] = useState(value);
  useEffect(() => {
    setPercentage(Math.min(Math.max(value, 0), 100).toFixed());
  }, [value]);
  return (
    <div
      className="progress-bar"
      aria-label="File upload progress"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuetext={`${percentage} percent`}
    >
      <span style={{ color: percentage > 50 ? "white" : "black" }}>
        {percentage}%
      </span>
      <div className="progress" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default ProgresBar;
