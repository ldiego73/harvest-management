export type Result<E, T> = Err<E, T> | Ok<E, T>;

export class Err<E, T = never> {
  readonly error: E;

  constructor(error: E) {
    this.error = error;
  }

  isErr(): this is Err<E, T> {
    return true;
  }

  isOk(): this is Ok<E, T> {
    return false;
  }
}

export class Ok<E, T> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  isErr(): this is Err<E, T> {
    return false;
  }

  isOk(): this is Ok<E, T> {
    return true;
  }
}

export const err = <E, T>(error: E): Result<E, T> => new Err(error);
export const ok = <E, T>(value?: T): Result<E, T> => new Ok(value as T);
export const combine = <E, T>(results: Result<E, T>[]): Result<E, T> => {
  for (const result of results) {
    if (result.isErr()) return result;
  }
  return ok(undefined as T);
};
