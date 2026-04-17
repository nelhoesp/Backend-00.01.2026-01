export interface IAppError extends Error {
  statusCode: number;
  code: string;
}
