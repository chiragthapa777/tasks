import { useState } from "react";
import Button from "../Button/Button";

type Props = { totalPages: number };

export default function Pagination({ totalPages }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center justify-end space-x-2 mt-6">
      {/* Previous Button */}
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100  w-auto capitalize text-xs"
      >
        Previous
      </Button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-4 py-2 text-xs font-medium border rounded-md w-auto
              ${
                page === currentPage
                  ? "text-white bg-blue-500 border-blue-500 hover:bg-blue-600"
                  : "text-gray-700 bg-white border-gray-300 hover:bg-gray-100"
              }`}
        >
          {page}
        </Button>
      ))}

      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className=" text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100  w-auto capitalize text-xs"
      >
        Next
      </Button>
    </div>
  );
}
