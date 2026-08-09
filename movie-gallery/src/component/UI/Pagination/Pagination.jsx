import styles from "./Pagination.module.css";

const Pagination = ({ totalItems, itemsPerPage, currentPage, currentPageHandler }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageItems = () => {
    if (totalPages <= 9) {
      return [...Array(totalPages).keys()].map((num) => num + 1);
    }

    const pages = [1];
    const start = Math.max(currentPage - 2, 2);
    const end = Math.min(currentPage + 2, totalPages - 1);

    if (start > 2) {
      pages.push("left-ellipsis");
    }

    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }

    if (end < totalPages - 1) {
      pages.push("right-ellipsis");
    }

    pages.push(totalPages);
    return pages;
  };

  const pageItems = getPageItems();

  return (
    <div className={styles.paginationWrapper}>
      <div className={`d-flex justify-content-center flex-wrap ${styles.paginationInner}`}>
        <button
          className="btn btn-secondary mx-1 mb-2"
          onClick={() => currentPageHandler(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pageItems.map((item) =>
          item === "left-ellipsis" || item === "right-ellipsis" ? (
            <span key={item} className={`btn btn-outline-secondary mx-1 mb-2 ${styles.paginationEllipsis}`}>
              …
            </span>
          ) : (
            <button
              key={item}
              className={`btn mx-1 mb-2 ${
                currentPage === item ? "btn-secondary" : "btn-outline-secondary"
              }`}
              onClick={() => currentPageHandler(item)}
            >
              {item}
            </button>
          )
        )}
        <button
          className="btn btn-secondary mx-1 mb-2"
          onClick={() => currentPageHandler(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;