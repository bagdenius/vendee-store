export type Result<T, E extends Error> =
  | { data: T; error?: undefined }
  | { data?: undefined; error: E };
