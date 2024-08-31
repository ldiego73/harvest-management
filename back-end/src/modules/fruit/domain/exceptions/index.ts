import { Exception } from "@common/exception";

export class FruitInvalidException extends Exception {
  constructor(code: string, message: string) {
    super(code, message);
  }
}

export class VarietyInvalidException extends Exception {
  constructor(code: string, message: string) {
    super(code, message);
  }
}
