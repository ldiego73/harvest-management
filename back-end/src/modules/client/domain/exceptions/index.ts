import { Exception } from "@common/exception";

export class ClientInvalidException extends Exception {
  constructor(code: string, message: string) {
    super(code, message);
  }
}
