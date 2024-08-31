import { Exception } from "@common/exception";

export class FieldInvalidException extends Exception {
  constructor(code: string, message: string) {
    super(code, message);
  }
}

export class FarmerInvalidException extends Exception {
  constructor(code: string, message: string) {
    super(code, message);
  }
}
