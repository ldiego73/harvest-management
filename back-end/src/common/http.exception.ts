import { Exception } from "./exception";
import { HttpStatus } from "./http-status";

export type HttpException = {
  status: number;
  code: string;
  message: string;
  timestamp: string;
};

export class HttpResponseException extends Exception {
  status: number;
  timestamp: string;

  constructor(status: number, code: string, message: string) {
    super(code, message);

    this.status = status;
    this.timestamp = new Date().toISOString();
  }
}

export class NotFoundException extends HttpResponseException {
  constructor(code: string, message: string) {
    super(HttpStatus.NOT_FOUND, code, message);
  }
}

export class BadRequestException extends HttpResponseException {
  constructor(code: string, message: string) {
    super(HttpStatus.BAD_REQUEST, code, message);
  }
}

export class UnauthorizedException extends HttpResponseException {
  constructor(code: string, message: string) {
    super(HttpStatus.UNAUTHORIZED, code, message);
  }
}

export class ForbiddenException extends HttpResponseException {
  constructor(code: string, message: string) {
    super(HttpStatus.FORBIDDEN, code, message);
  }
}

export class ConflictException extends HttpResponseException {
  constructor(code: string, message: string) {
    super(HttpStatus.CONFLICT, code, message);
  }
}

export class UnprocessableEntityException extends HttpResponseException {
  constructor(code: string, message: string) {
    super(HttpStatus.UNPROCESSABLE_ENTITY, code, message);
  }
}

export class InternalServerErrorException extends HttpResponseException {
  constructor(code: string, message: string) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, code, message);
  }
}
