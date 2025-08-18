import { Link, Outlet } from "react-router-dom";
import { useAppContext } from "../context/context";

const AppLayout = () => {
  const {
    state: { cart },
    filter: { search },
    filterDispatch,
    screenSize,
  } = useAppContext();
  return (
    <div className="p-5 min-h-dvh">
      <nav
        className={`flex ${
          screenSize < 580 && "flex-col gap-2"
        } justify-between items-center p-3`}
      >
        <Link to={"/"}>
          <h2 className="font-bold font-mono text-2xl">Chaitu Ecommerce</h2>
        </Link>
        <input
          value={search}
          onChange={(e) =>
            filterDispatch({ type: "SEARCH_FILTER", payload: e.target.value })
          }
          type="text"
          placeholder="Search products..."
          className="px-3 py-1 border-1 focus:outline-0"
        />
        <Link
          to={"/cart"}
          className={`px-${
            screenSize < 580 ? "21" : "3"
          } py-1  bg-gray-800 text-white rounded-sm`}
        >
          {`Cart(${cart.length})`}
        </Link>
      </nav>
      <main className="h-[65vh]">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
