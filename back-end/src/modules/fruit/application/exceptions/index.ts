import { Exception } from "@common/exception";

export class FruitAlreadyExistsException extends Exception {
  constructor(message: string) {
    super("FRUIT_ALREADY_EXISTS", message);
  }
}

export class FruitNotFoundException extends Exception {
  constructor(message: string) {
    super("FRUIT_NOT_FOUND", message);
  }
}

export class VarietyAlreadyExistsException extends Exception {
  constructor(message: string) {
    super("VARIETY_ALREADY_EXISTS", message);
  }
}

export class VarietyNotFoundException extends Exception {
  constructor(message: string) {
    super("VARIETY_NOT_FOUND", message);
  }
}
