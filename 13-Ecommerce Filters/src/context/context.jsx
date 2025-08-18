import { useReducer } from "react";
import { useContext } from "react";
import { createContext } from "react";
import appReducer, { filterReducer } from "./reducer";
import { useEffect } from "react";
import { useState } from "react";

const appContext = createContext();
export const filterInitState = {
  sort: "",
  rating: "3",
  stock: "false",
  search: "",
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    products: [],
    cart: [],
  });
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const handleScreenSize = () => {
    setScreenSize(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleScreenSize);
    return () => {
      window.removeEventListener("resize", handleScreenSize);
    };
  }, [screenSize]);

  const [filter, filterDispatch] = useReducer(filterReducer, filterInitState);
  const fetchData = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=100`);
      if (!response.ok) throw new Error("Something went wrong");
      const data = await response.json();
      dispatch({ type: "FETCH_DATA", payload: data.products });
    } catch (err) {
      console.log("Fetch Error:", err.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <appContext.Provider
      value={{ state, dispatch, filter, filterDispatch, screenSize }}
    >
      {children}
    </appContext.Provider>
  );
};
export default AppProvider;

export const useAppContext = () => {
  return useContext(appContext);
};
