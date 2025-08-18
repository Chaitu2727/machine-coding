import { filterInitState } from "./context";

const appReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, products: action.payload };
    case "ADDTO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
    case "REMOVEFROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case "UPDATE_QTY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };
    default:
      return state;
  }
};

export default appReducer;

export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SORT_FILTER":
      return { ...state, sort: action.payload };
    case "RATE_FILTER":
      return { ...state, rating: action.payload };
    case "STOCK_FILTER":
      return { ...state, stock: action.payload };
    case "SEARCH_FILTER":
      return { ...state, search: action.payload };
    case "CLEAR_FILTER":
      return filterInitState;
    default:
      return state;
  }
};
