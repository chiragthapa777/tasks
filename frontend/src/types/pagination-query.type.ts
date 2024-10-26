export type paginationQuery = {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
  totalPage?: number;
};
