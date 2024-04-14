import React, { useState } from "react";
import ReactPaginate from "react-paginate";

type IProps = {
  pageCount: number;
};

function Pagination({ pageCount }: IProps) {
  const [currPage, setCurrPage] = useState<number>(0);
  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrPage(selected + 1);
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
              ? "hidden"
              : "text-teal-700 border-teal-700 hover:text-teal-700/30"
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
              ? "hidden"
              : "text-teal-700 border-teal-700 hover:text-teal-700/30"
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
