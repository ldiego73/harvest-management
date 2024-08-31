import { Exception } from "@common/exception";

export class HarvestInvalidException extends Exception {
  constructor(code: string, message: string) {
    super(code, message);
  }
}
