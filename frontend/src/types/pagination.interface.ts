export interface IPagination<T> {
  data: T[];
  paginationMeta: {
    totalPage: number;
    totalItem: number;
  };
}
