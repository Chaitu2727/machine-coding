const Pagination = ({
  currentPage = 1,
  slideLength = 3,
  products = [],
  productPerPage = 10,
  hadlePageChange = () => {},
}) => {
  const paginationLength =
    products.length % productPerPage === 0
      ? products.length / productPerPage
      : Math.floor(products.length / productPerPage) + 1;
  const paginationArray = Array.from(
    { length: paginationLength },
    (_, i) => i + 1
  );
  const slideLengthPerPage =
    paginationLength >= slideLength ? slideLength : paginationLength;
  const slideArray = Array.from(
    {
      length: slideLengthPerPage,
    },
    (_, i) => {
      if (currentPage === 1) {
        return currentPage + i;
      }
      if (currentPage === paginationArray.length) {
        return currentPage - slideLength + i + 1;
      }
      return slideLength % 2 === 0
        ? currentPage - (slideLength % 2) + i - 1
        : currentPage - Math.ceil(slideLength / 2) + i + 1;
    }
  );

  return (
    <div className="pagination-container flex items-center justify-center">
      <button
        disabled={currentPage == 1}
        className="btn btn-prev__first"
        onClick={() => hadlePageChange(1)}
      >
        {"<<"}
      </button>
      <button
        disabled={currentPage == 1}
        className="btn btn-prev"
        onClick={() => hadlePageChange(currentPage - 1)}
      >
        {"<"}
      </button>
      {currentPage > slideLengthPerPage - 1 && (
        <span className="pagination-number">{"..."}</span>
      )}
      {slideArray.map((number) => (
        <span
          key={number}
          className={`pagination-number ${
            currentPage === number && "pagination-active"
          }`}
          onClick={() => hadlePageChange(number)}
        >
          {number}
        </span>
      ))}
      {currentPage < paginationLength - (slideLengthPerPage - 2) && (
        <span className="pagination-number">{"..."}</span>
      )}
      <button
        disabled={currentPage == paginationLength}
        className="btn btn-next"
        onClick={() => hadlePageChange(currentPage + 1)}
      >
        {">"}
      </button>
      <button
        disabled={currentPage == paginationLength}
        className="btn btn-next__first"
        onClick={() => hadlePageChange(paginationLength)}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
