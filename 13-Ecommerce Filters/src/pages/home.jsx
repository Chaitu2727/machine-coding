import React from "react";
import { useAppContext } from "../context/context";
import StarRating from "../components/star-rating";
import { useState } from "react";
import Pagination from "../components/pagination";
import Filter from "../components/filter";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const {
    state: { products, cart },
    filter,
    screenSize,
    dispatch,
  } = useAppContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    if (searchParam.size) {
      searchParam.forEach((value, key) => {
        filter[key] = value;
      });
    }
  }, []);
  useEffect(() => {
    setSearchParam(filter);
  }, [filter]);

  const hadlePageChange = (number) => {
    setCurrentPage(number);
  };

  const handleFilter = useCallback(() => {
    let filterProducts = [...products];
    if (filter.sort) {
      filterProducts = filterProducts.sort((a, b) =>
        filter.sort === "ascending" ? a.price - b.price : b.price - a.price
      );
    }
    if (filter.rating) {
      filterProducts = filterProducts.filter(
        (product) => product.rating >= filter.rating
      );
    }
    if (filter.stock === "true") {
      filterProducts = filterProducts.filter((product) => product.stock >= 1);
    }
    if (filter.search) {
      filterProducts = filterProducts.filter((product) =>
        product.title.toLowerCase().includes(filter.search.toLowerCase())
      );
    }
    return filterProducts;
  }, [{ ...filter }]);
  const handleAddCart = (isPresentInCart, product) => {
    if (isPresentInCart) {
      dispatch({ type: "REMOVEFROM_CART", payload: { id: product.id } });
    } else {
      dispatch({ type: "ADDTO_CART", payload: product });
    }
  };
  return (
    <div className="p-3">
      <div
        className={`flex ${
          screenSize < 580 && "flex-col gap-2"
        } gap-5 p-3 justify-around`}
      >
        <Filter />
        <div className="flex flex-col justify-center">
          <div className="flex flex-col items-center gap-3">
            <div
              className={`w-fit grid grid-cols-${
                screenSize >= 1175 ? "3" : screenSize >= 870 ? "2" : "1"
              } gap-2.5 justify-items-center`}
            >
              {handleFilter()
                .slice(10 * currentPage - 10, 10 * currentPage)
                .map((product) => {
                  const isPresentInCart = cart.some(
                    (item) => item.id === product.id
                  );
                  return (
                    <div
                      key={product.id}
                      className="w-[300px] border border-gray-700 items-center"
                    >
                      <img
                        className="w-full flex justify-center items-center"
                        src={product.thumbnail}
                        alt={product.title}
                      />
                      <div className="border-t border-gray-700 "></div>
                      <p className="text-center py-1">{product.title}</p>
                      <div className="flex justify-around py-1">
                        <p>$ {product.price}</p>
                        <StarRating rating={product.rating} />
                        <button
                          disabled={!product.stock}
                          className={`cursor-pointer ${
                            product.stock > 0
                              ? !isPresentInCart
                                ? "bg-amber-300"
                                : "bg-blue-300"
                              : "bg-gray-100 opacity-5 disabled:cursor-not-allowed"
                          } px-3`}
                          onClick={() =>
                            handleAddCart(isPresentInCart, product)
                          }
                        >
                          {product.stock > 0
                            ? isPresentInCart
                              ? "Remove from cart"
                              : "Add To Cart"
                            : "Out of stock"}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <Pagination
        products={handleFilter()}
        currentPage={currentPage}
        slideLength={3}
        productPerPage={10}
        hadlePageChange={hadlePageChange}
      />
    </div>
  );
};

export default Home;
