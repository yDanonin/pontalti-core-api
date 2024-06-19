export enum Status {
  Suspenso,
  Operacional
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

export type CommonRequest<T = unknown> = Partial<T> & Partial<{
  page: number;
  perPage: number;
}>
