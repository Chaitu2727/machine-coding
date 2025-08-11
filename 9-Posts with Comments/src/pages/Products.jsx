import React from "react";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParam, setSearcParam] = useSearchParams();
  const setParam = (newParam) => {
    const oldPram = Object.fromEntries(searchParam.entries());
    const merged = { ...oldPram, ...newParam };

    setSearcParam(merged);
  };
  return (
    <div>
      <h1>Products</h1>
      <div>
        <h3>Colors:</h3>
        <button onClick={() => setParam({ color: "red" })}>Red</button>
        <button onClick={() => setParam({ color: "blue" })}>Blue</button>
      </div>
      <div>
        <h3>size:</h3>
        <button onClick={() => setParam({ size: 10 })}>10</button>
        <button onClick={() => setParam({ size: 11 })}>11</button>
      </div>
    </div>
  );
};

export default Products;
