import { Link } from "react-router-dom";
import StarRating from "../components/star-rating";
import { useAppContext } from "../context/context";
import { useCallback } from "react";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
    screenSize,
    filter: { search },
  } = useAppContext();
  const handleUpdate = (item, type) => {
    if (type === "INCREMENT") {
      if (item.qty < item.stock) {
        dispatch({
          type: "UPDATE_QTY",
          payload: { id: item.id, qty: item.qty + 1 },
        });
      }
    } else if (type === "DECREMENT") {
      if (item.qty > 1) {
        dispatch({
          type: "UPDATE_QTY",
          payload: { id: item.id, qty: item.qty - 1 },
        });
      } else {
        dispatch({ type: "REMOVEFROM_CART", payload: { id: item.id } });
      }
    }
  };
  const filteredCartItems = useCallback(
    () =>
      cart.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      ),
    [search, cart]
  );
  return cart.length === 0 ? (
    <div className="flex flex-col gap-2 h-full justify-center items-center">
      <h3 className="text-2xl font-bold text-amber-800">
        Your Cart is empty!!!
      </h3>
      <Link
        to={"/"}
        className="cursor-pointer px-3 py-1 bg-rose-700 border-0 rounded-sm text-amber-50"
      >
        <button>Go Home</button>
      </Link>
    </div>
  ) : (
    <div className="p-3 flex flex-col gap-2">
      <h3 className="text-center font-bold text-xl">
        Subtotal : $
        {cart
          .reduce((acc, item) => {
            acc += item.price * item.qty;
            return acc;
          }, 0)
          .toFixed(2)}
      </h3>
      {filteredCartItems().map((item) => (
        <div
          key={item.id}
          className="flex h-32 justify-between items-center p-1.5 border border-gray-600"
        >
          <img src={item.thumbnail} alt={item.title} className="h-32 " />
          <div
            className={`flex gap-4 items-center ${
              screenSize < 580 && "flex-col gap-1 justify-center"
            }`}
          >
            <p className="text-center">{item.title}</p>
            <p>${item.price}</p>
            <StarRating rating={item.rating} />
          </div>
          <div
            className={`flex ${
              screenSize < 580 && "flex-col gap-2"
            } items-center gap-3 p-3`}
          >
            <div className={`flex items-center`}>
              <button
                className="p-1 w-3 btn"
                onClick={() => handleUpdate(item, "DECREMENT")}
              >
                -
              </button>
              <input
                value={item.qty}
                disabled
                className="w-3 text-center btn focus:outline-0 disabled:cursor-none"
              />
              <button
                onClick={() => handleUpdate(item, "INCREMENT")}
                className="p-1 w-3 btn"
              >
                +
              </button>
            </div>
            <button
              onClick={() =>
                dispatch({ type: "REMOVEFROM_CART", payload: { id: item.id } })
              }
              className="cursor-pointer bg-violet-700 text-white px-6 py-1 rounded-sm"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Cart;
