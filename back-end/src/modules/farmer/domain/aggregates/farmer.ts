import { AggregateRoot, UniqueEntityId } from "@shared/domain";
import { isNullOrUndefined } from "@common/helpers";
import { Result, ok, err } from "@common/result";

import { Email } from "@shared/domain/value-objects";

import { Field } from "../entities";
import { FarmerCreatedEvent, FarmerUpdatedEvent } from "../events";
import { FarmerInvalidException, FieldInvalidException } from "../exceptions";

export type FarmerProps = {
  readonly email: Email;
  readonly name: string;
  readonly lastName: string;
  fields: Field[];
};

export class Farmer extends AggregateRoot<FarmerProps> {
  private constructor(props: FarmerProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get email(): Email {
    return this.props.email;
  }

  get fields(): Field[] {
    return this.props.fields;
  }

  set fields(fields: Field[]) {
    this.props.fields = fields;
  }

  addField(field: Field): Result<FieldInvalidException, void> {
    if (
      this.fields.find(
        (f) => f.name === field.name && f.location === field.location,
      )
    ) {
      return err(
        new FieldInvalidException(
          "FIELD_ALREADY_EXISTS",
          "Field already exists",
        ),
      );
    }

    this.fields.push(field);

    return ok();
  }

  removeField(field: Field): Result<FieldInvalidException, void> {
    if (
      !this.fields.find(
        (f) => f.name === field.name && f.location === field.location,
      )
    ) {
      return err(
        new FieldInvalidException("FIELD_NOT_EXISTS", "Field does not exists"),
      );
    }

    this.fields = this.fields.filter(
      (f) => f.name !== field.name || f.location !== field.location,
    );

    return ok();
  }

  created(): void {
    this.addDomainEvent(new FarmerCreatedEvent(this));
  }

  updated(): void {
    this.addDomainEvent(new FarmerUpdatedEvent(this));
  }

  static create(
    props: FarmerProps,
    id?: UniqueEntityId,
  ): Result<FarmerInvalidException, Farmer> {
    if (isNullOrUndefined(props.name) || props.name.trim() === "") {
      return err(
        new FarmerInvalidException("NAME_REQUIRED", "Name is required"),
      );
    }

    if (isNullOrUndefined(props.lastName) || props.lastName.trim() === "") {
      return err(
        new FarmerInvalidException(
          "LAST_NAME_REQUIRED",
          "Last name is required",
        ),
      );
    }

    return ok(new Farmer(props, id));
  }

  static from(id: string, props: FarmerProps): Farmer {
    return new Farmer(props, new UniqueEntityId(id));
  }
}
