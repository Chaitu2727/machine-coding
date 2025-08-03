import { useEffect, useState } from "react";
import "./App.css";
import Carousel from "./components/carousel";

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchImages = async (limit) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://picsum.photos/v2/list?limit=${limit}`
      );
      if (!response.ok) throw new Error("Something went wrong");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.log("Fetch Image Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(8);
  }, []);
  return (
    <div className="carousel-container">
      <Carousel
        images={images}
        isLoading={loading}
        imageLimit={6}
        imagesPerSlide={2}
        customPrevButton={(goPrev) => (
          <button className="btn btn-left" onClick={goPrev}>
            Prev
          </button>
        )}
        customNextButton={(goNext) => (
          <button className="btn btn-right" onClick={goNext}>
            Next
          </button>
        )}
      />
    </div>
  );
}

export default App;
