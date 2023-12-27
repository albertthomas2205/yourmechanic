import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const itemsPerPage = 4; // Set the number of items per page
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const getVisiblePages = () => {
    const totalVisiblePages = 3; // Number of visible pages in the pagination bar
    const halfVisiblePages = Math.floor(totalVisiblePages / 2);

    if (currentPage <= halfVisiblePages) {
      return pageNumbers.slice(0, totalVisiblePages);
    } else if (currentPage + halfVisiblePages >= totalPages) {
      return pageNumbers.slice(totalPages - totalVisiblePages, totalPages);
    } else {
      return pageNumbers.slice(currentPage - halfVisiblePages - 1, currentPage + halfVisiblePages);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {getVisiblePages().map((page) => (
          <IconButton
            key={page}
            variant={currentPage === page ? "filled" : "text"}
            color="gray"
            onClick={() => onPageChange(page)}
          >
            {page}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
