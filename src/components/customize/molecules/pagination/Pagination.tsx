import React, { useState } from "react";
import ReactPaginate from "react-paginate";

type IProps = {
  pageCount: number;
  currPage: number;
  setCurrPage: (number: number) => void;
};

function Pagination({ pageCount, currPage, setCurrPage }: IProps) {
  const handlePageChange = (event: any) => {
    setCurrPage(event.selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={4}
      previousLabel={
        <button
          disabled={currPage === 1}
          className={`text-sm px-4 py-1.5 transition-all ${
            currPage === 1
              ? "text-gray-300"
              : "text-teal-700 border-teal-700 hover:text-teal-700/70"
          }`}
        >
          Previous
        </button>
      }
      nextLabel={
        <button
          disabled={currPage === pageCount}
          className={`text-sm px-4 py-1.5 transition-all ${
            currPage === pageCount
              ? "text-gray-300"
              : "text-teal-700 border-teal-700 hover:text-teal-700/70"
          }`}
        >
          Next
        </button>
      }
      containerClassName="flex gap-2 items-center"
      pageClassName="flex w-10 h-10 font-medium border rounded-lg transition-colors text-sm text-teal-700 border-teal-700 hover:bg-slate-50"
      pageLinkClassName="flex w-full h-full justify-center items-center"
      activeClassName="text-white bg-teal-700 hover:bg-teal-600"
      renderOnZeroPageCount={null}
      onPageChange={handlePageChange}
    />
  );
}

export default Pagination;
