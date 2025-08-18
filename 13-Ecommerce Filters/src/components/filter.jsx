import StarRating from "./star-rating";
import { useAppContext } from "../context/context";

const Filter = () => {
  const {
    filter: { sort, rating, stock },
    filterDispatch,
  } = useAppContext();
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-bold text-cyan-950">Filter Section:</h3>
      <div className="flex gap-1 items-center">
        <input
          onChange={() =>
            filterDispatch({ type: "SORT_FILTER", payload: "ascending" })
          }
          type="radio"
          id="ascending"
          value="ascending"
          checked={sort === "ascending"}
        />
        <label htmlFor="ascending">Ascending</label>
      </div>
      <div className="flex gap-1 items-center">
        <input
          onChange={() =>
            filterDispatch({ type: "SORT_FILTER", payload: "descending" })
          }
          type="radio"
          id="descending"
          value="descending"
          checked={sort === "descending"}
        />
        <label htmlFor="descending">Descending</label>
      </div>
      <div className="flex gap-1 items-center">
        <input
          type="checkbox"
          id="outofstock"
          checked={stock === "true"}
          onChange={() =>
            filterDispatch({
              type: "STOCK_FILTER",
              payload: stock === "false" ? "true" : "false",
            })
          }
        />
        <label htmlFor="outofstock">Include out of stock</label>
      </div>
      <div className="flex gap-1 items-center">
        <p>Rating:</p>
        <StarRating
          rating={rating}
          onChange={(i) => {
            filterDispatch({ type: "RATE_FILTER", payload: i });
          }}
        />
      </div>
      <button
        className="cursor-pointer bg-blue-800 text-white rounded-sm p-1"
        onClick={() => filterDispatch({ type: "CLEAR_FILTER" })}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default Filter;
