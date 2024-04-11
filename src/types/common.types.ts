export enum Status {
  suspenso,
  operacional
}

export type PaginationResponse<T = unknown> = {
  data: T[];
  page: number;
  perPage: number;
  totalRecord: number;
  nextPage: string;
};

export type DefaultResponse<T = object> = {
  data: T | T[];
};

export type CommonRequest<T = unknown> = Partial<T> & {
  page: number;
  perpage: number;
}
