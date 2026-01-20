// statuses
export type Ok<T> = { status: 'ok'; value: T };
export type Err<E extends Error> = { status: 'error'; error: E };
export type Loading = { status: 'loading' };
export type Unauthorized = { status: 'unauthorized' };
export type Forbidden = { status: 'forbidden' };

// main result type
export type Result<T, E extends Error = Error> =
  | Ok<T>
  | Err<E>
  | Loading
  | Unauthorized
  | Forbidden;

// constructors
export const ok = <T = void>(value?: T): Ok<T> => ({
  status: 'ok',
  value: value as T,
});

export const err = <E extends Error>(error: E): Err<E> => ({
  status: 'error',
  error,
});
export const loading = (): Loading => ({ status: 'loading' });
export const unauthorized = (): Unauthorized => ({ status: 'unauthorized' });

// type guards
export const isOk = <T, E extends Error>(r: Result<T, E>): r is Ok<T> =>
  r.status === 'ok';
export const isErr = <T, E extends Error>(r: Result<T, E>): r is Err<E> =>
  r.status === 'error';
export const isLoading = <T, E extends Error>(r: Result<T, E>): r is Loading =>
  r.status === 'loading';
export const isUnauthorized = <T, E extends Error>(
  r: Result<T, E>,
): r is Unauthorized => r.status === 'unauthorized';

// unwrap helpers
export function unwrap<T, E extends Error>(r: Result<T, E>): T {
  if (!isOk(r))
    throw r.status === 'error'
      ? r.error
      : new Error(`Cannot unwrap ${r.status} result`);
  return r.value;
}

export function unwrapOr<T, E extends Error>(r: Result<T, E>, fallback: T): T {
  return isOk(r) ? r.value : fallback;
}

export function unwrapOrElse<T, E extends Error>(
  r: Result<T, E>,
  fn: (e: E | Result<T, E>) => T,
): T {
  return isOk(r) ? r.value : fn(r.status === 'error' ? r.error : r);
}

// mappers
export function map<T, U, E extends Error>(
  r: Result<T, E>,
  fn: (v: T) => U,
): Result<U, E> {
  return isOk(r) ? ok(fn(r.value)) : r;
}

export function mapErr<T, E extends Error, F extends Error>(
  r: Result<T, E>,
  fn: (e: E) => F,
): Result<T, F> {
  return isErr(r) ? err(fn(r.error)) : r;
}

export function flatMap<T, U, E extends Error, F extends Error>(
  r: Result<T, E>,
  fn: (v: T) => Result<U, F>,
): Result<U, E | F> {
  return isOk(r) ? fn(r.value) : r;
}

// async-safe wrapper
export async function safeCall<T>(fn: () => Promise<T>): Promise<Result<T>> {
  try {
    return ok(await fn());
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
}
