import React from 'react';

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-end mt-4 items-center">
      {currentPage > 1 && (
        <button
          onClick={() => paginate(currentPage - 1)}
          className="btn mr-2"
        >
          Previous
        </button>
      )}
      {pageNumbers.map((number) => (
        <span
          key={number}
          onClick={() => paginate(number)}
          className={`cursor-pointer px-2 ${currentPage === number ? 'font-bold' : ''}`}
        >
          {number}
        </span>
      ))}
      {currentPage < pageNumbers.length && (
        <button
          onClick={() => paginate(currentPage + 1)}
          className="btn ml-2"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
