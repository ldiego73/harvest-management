import { isNullOrUndefined, isEmail } from "@common/helpers";

import { ValueObject } from "../value-object";
import { Exception } from "@common/exception";

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  constructor(props: EmailProps) {
    super(props);
  }

  static create(value: string): Email {
    if (isNullOrUndefined(value) || value.trim() === "") {
      throw new EmailInvalidException("EMAIL_REQUIRED", "Email is required");
    }

    if (!isEmail(value)) {
      throw new EmailInvalidException("EMAIL_INVALID", "Email is invalid");
    }

    return new Email({ value });
  }
}

export class EmailInvalidException extends Exception {
  constructor(code: string, message: string) {
    super(code, message);
  }
}
