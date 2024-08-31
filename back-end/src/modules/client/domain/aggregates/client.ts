import { isNullOrUndefined } from "@common/helpers";
import { Result, ok, err } from "@common/result";
import { UniqueEntityId } from "@shared/domain";
import { AggregateRoot } from "@shared/domain/aggregate-root";
import { Email } from "@shared/domain/value-objects";

import { ClientCreatedEvent, ClientUpdatedEvent } from "../events";
import { ClientInvalidException } from "../exceptions";

export type ClientProps = Readonly<{
  email: Email;
  name: string;
  lastName: string;
}>;

export class Client extends AggregateRoot<ClientProps> {
  private constructor(props: ClientProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get email(): Email {
    return this.props.email;
  }

  get name(): string {
    return this.props.name;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  created(): void {
    this.addDomainEvent(new ClientCreatedEvent(this));
  }

  updated(): void {
    this.addDomainEvent(new ClientUpdatedEvent(this));
  }

  static create(
    props: ClientProps,
    id?: UniqueEntityId,
  ): Result<ClientInvalidException, Client> {
    if (isNullOrUndefined(props.name) || props.name.trim() === "") {
      return err(
        new ClientInvalidException("NAME_REQUIRED", "Name is required"),
      );
    }

    if (isNullOrUndefined(props.lastName) || props.lastName.trim() === "") {
      return err(
        new ClientInvalidException(
          "LAST_NAME_REQUIRED",
          "Last name is required",
        ),
      );
    }

    return ok(new Client(props, id));
  }

  static from(id: string, props: ClientProps): Client {
    return new Client(props, new UniqueEntityId(id));
  }
}
