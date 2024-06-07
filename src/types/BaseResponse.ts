export type IPaginationResponse<T> = {
  totalData: number;
  data: T[];
};

export type ISingleResponse<T> = {
  data: T;
};

