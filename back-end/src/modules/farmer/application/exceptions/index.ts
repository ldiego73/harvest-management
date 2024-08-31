import { Exception } from "@common/exception";

export class FarmerAlreadyExistsException extends Exception {
  constructor(message: string) {
    super("FARMER_ALREADY_EXISTS", message);
  }
}

export class FarmerNotFoundException extends Exception {
  constructor(message: string) {
    super("FARMER_NOT_FOUND", message);
  }
}

export class FieldAlreadyExistsException extends Exception {
  constructor(message: string) {
    super("FIELD_ALREADY_EXISTS", message);
  }
}

export class FieldNotFoundException extends Exception {
  constructor(message: string) {
    super("FIELD_NOT_FOUND", message);
  }
}
