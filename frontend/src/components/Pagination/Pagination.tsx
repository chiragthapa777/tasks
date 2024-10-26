import { paginationQuery } from "../../types/pagination-query.type";
import Button from "../Button/Button";

type Props = {
  totalPages: number;
  setPagination: React.Dispatch<React.SetStateAction<paginationQuery>>;
  currentPage: number;
};

export default function Pagination({
  totalPages,
  currentPage,
  setPagination,
}: Props) {
  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setPagination((prev) => ({ ...prev, page: (prev.page ?? 1) + 1 }));
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setPagination((prev) => ({ ...prev, page: (prev.page ?? 1) - 1 }));
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
