import {
  HttpResponseException,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
  ConflictException,
  UnprocessableEntityException,
} from "@common/http.exception";
import { Logger } from "@common/logger";

export class BaseController {
  readonly logger = Logger.create(this.constructor.name);

  constructor() {}

  private throwException(exception: HttpResponseException) {
    throw exception;
  }

  protected badRequest(code: string, message: string) {
    this.throwException(new BadRequestException(code, message));
  }

  protected notFound(code: string, message: string) {
    this.throwException(new NotFoundException(code, message));
  }

  protected internalServerError(code: string, message: string) {
    this.throwException(new InternalServerErrorException(code, message));
  }

  protected unauthorized(code: string, message: string) {
    this.throwException(new InternalServerErrorException(code, message));
  }

  protected forbidden(code: string, message: string) {
    this.throwException(new ForbiddenException(code, message));
  }

  protected conflict(code: string, message: string) {
    this.throwException(new ConflictException(code, message));
  }

  protected unprocessableEntity(code: string, message: string) {
    this.throwException(new UnprocessableEntityException(code, message));
  }
}
