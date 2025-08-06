import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${pageCount * 9}`
      );
      if (!response.ok) throw new Error("Something Went Wrong");
      const data = await response.json();
      setProducts(data);
      setPageCount(pageCount + 1);
    } catch (error) {
      console.log("Data Fetch Erro:", error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const myThrottle = (cb, delay) => {
    let last = 0;
    return (...args) => {
      const now = new Date().getTime();
      if (now - last < delay) return;
      last = now;
      return cb(...args);
    };
  };
  const handleResize = myThrottle(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 500 >
        document.documentElement.offsetHeight &&
      !loading &&
      products.limit < products.total
    ) {
      fetchData();
    }
  }, 500);
  useEffect(() => {
    window.addEventListener("scroll", handleResize);
    return () => {
      window.removeEventListener("scroll", handleResize);
    };
  }, [handleResize]);
  const { products: productsArr } = products;
  return (
    <div className="app">
      <div className="products-container">
        {productsArr?.map((item) => (
          <div className="product-card" key={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <div className="stroke"></div>
            <p>${item.title}</p>
          </div>
        ))}
      </div>
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default App;
