import { useEffect, useRef, useState } from "react";

const Carousel = ({
  images,
  isLoading,
  imagesPerSlide = 1,
  imageLimit,
  customPrevButton,
  customNextButton,
}) => {
  const imageRef = useRef(null);
  const [imageWidth, setImageWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      setCurrentIndex(0);
    }
  }, [images]);
  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageLimit - 1 : prev - 1));
  };
  const goNext = () => {
    setCurrentIndex((prev) => (prev === imageLimit - 1 ? 0 : prev + 1));
  };

  return isLoading ? (
    <div>Loading....</div>
  ) : (
    <div className="carousel" style={{ width: imageWidth * imagesPerSlide }}>
      <div
        className="image-container"
        style={{ transform: `translateX(-${currentIndex * imageWidth}px)` }}
      >
        {images.slice(0, imageLimit).map((image) => (
          <img
            onLoad={() => setImageWidth(imageRef?.current?.offsetWidth)}
            ref={imageRef}
            key={image.id}
            src={image.download_url}
            alt={image.author}
            className="image"
          />
        ))}
      </div>
      {customPrevButton instanceof Function ? (
        customPrevButton(goPrev)
      ) : (
        <button className="btn btn-left" onClick={goPrev}>
          Prev
        </button>
      )}
      {customNextButton instanceof Function ? (
        customNextButton(goNext)
      ) : (
        <button className="btn btn-right" onClick={goNext}>
          Next
        </button>
      )}
    </div>
  );
};

export default Carousel;
