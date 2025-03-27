const Pagination = ({ totalItems, itemsPerPage, currentPage, currentPageHandler }) => {

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);  

  return (
    <div className="d-flex justify-content-center">
      <button
        className="btn btn-secondary mx-1"
        onClick={() => currentPageHandler(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`btn mx-1 ${
            currentPage === page ? "btn-secondary" : "btn-outline-secondary"
          }`}
          onClick={() => currentPageHandler(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="btn btn-secondary mx-1"
        onClick={() => currentPageHandler(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;