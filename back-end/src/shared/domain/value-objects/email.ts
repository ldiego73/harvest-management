import { isNullOrUndefined, isEmail } from "@common/helpers";

import { ValueObject } from "../value-object";
import { Exception } from "@common/exception";
import { err, ok, Result } from "@common/result";

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  constructor(props: EmailProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  static create(value: string): Result<EmailInvalidException, Email> {
    if (isNullOrUndefined(value) || value.trim() === "") {
      return err(
        new EmailInvalidException("EMAIL_REQUIRED", "Email is required"),
      );
    }

    if (!isEmail(value)) {
      return err(
        new EmailInvalidException("EMAIL_INVALID", "Email is invalid"),
      );
    }

    return ok(new Email({ value }));
  }

  static from(value: string): Email {
    if (isNullOrUndefined(value) || value.trim() === "") {
      throw new EmailInvalidException("EMAIL_REQUIRED", "Email is required");
    }

    if (!isEmail(value)) {
      throw new EmailInvalidException("EMAIL_INVALID", "Email is invalid");
    }

    return new Email({ value });
  }

  static fromString(value: string): Email {
    return new Email({ value });
  }
}

export class EmailInvalidException extends Exception {
  constructor(code: string, message: string) {
    super(code, message);
  }
}
