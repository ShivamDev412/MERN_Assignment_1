import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useAtom } from "jotai";
import { employeesState, query } from "../store";

const Navigator = ({
  direction,
  callback,
  currentPage,
  totalPages,
}: {
  direction: string;
  callback: () => void;
  currentPage: number;
  totalPages: number;
}) => {
  return (
    <button onClick={callback} disabled={currentPage === totalPages}>
      {direction === "left" ? (
        <MdKeyboardArrowLeft
          className={`text-2xl ${
            currentPage === totalPages && "fill-gray-500"
          }`}
        />
      ) : (
        <MdKeyboardArrowRight
          className={`text-2xl ${
            currentPage === totalPages && "fill-gray-500"
          }`}
        />
      )}
    </button>
  );
};

const Pagination = () => {
  const [variables, setVariables] = useAtom(query);
  const [totalPages, setTotalPages] = useState(0);
  const [employees] = useAtom(employeesState);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setTotalPages(Math.ceil(employees.total / variables.limit));
    setCurrentPage(variables.page);
  }, [employees.total, variables.page]);
  console.log(employees.total)
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    setVariables({
      ...variables,
      page,
    });
  };

  const handlePrevClick = () => {
    const prevPage = currentPage - 1;
    if (prevPage >= 1) {
      handlePageClick(prevPage);
    }
  };

  const handleNextClick = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      handlePageClick(nextPage);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxPagesToShow = 4;
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`${
              currentPage === i ? "border-white" : "border-gray-600"
            } px-3 py-1 rounded-lg border`}
          >
            {i}
          </button>
        );
      }
    } else {
      const startPage = Math.max(
        currentPage - Math.floor(maxPagesToShow / 2),
        1
      );
      const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

      if (startPage > 1) {
        pages.push(
          <button
            key={1}
            onClick={() => handlePageClick(1)}
            className={`${
              currentPage === 1 ? "border-white" : "border-gray-600"
            } px-3 py-1 rounded-lg border`}
          >
            1
          </button>
        );

        if (startPage > 2) {
          pages.push(<span key="ellipsis-start">...</span>);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={`${
              currentPage === i ? "border-white" : "border-gray-600"
            } px-3 py-1 rounded-lg border`}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(<span key="ellipsis-end">...</span>);
        }

        pages.push(
          <button
            key={totalPages}
            onClick={() => handlePageClick(totalPages)}
            className={`${
              currentPage === totalPages ? "border-white" : "border-gray-600"
            } px-3 py-1 rounded-lg border`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center space-x-2 justify-end mt-4">
      <Navigator
        direction="left"
        callback={handlePrevClick}
        currentPage={currentPage}
        totalPages={1}
      />
      {renderPagination()}

      <Navigator
        direction="right"
        callback={handleNextClick}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Pagination;
