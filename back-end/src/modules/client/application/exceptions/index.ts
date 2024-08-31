import { Exception } from "@common/exception";

export class ClientAlreadyExistsException extends Exception {
  constructor(message: string) {
    super("CLIENT_ALREADY_EXISTS", message);
  }
}

export class ClientNotFoundException extends Exception {
  constructor(message: string) {
    super("CLIENT_NOT_FOUND", message);
  }
}
