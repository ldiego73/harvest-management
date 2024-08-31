import { Entity, UniqueEntityId } from "@shared/domain";
import { isNullOrUndefined } from "@common/helpers";
import { Result, ok, err } from "@common/result";

import { FieldInvalidException } from "../exceptions";

export type FieldProps = Readonly<{
  name: string;
  location: string;
  farmerId: UniqueEntityId;
}>;

export class Field extends Entity<FieldProps> {
  private constructor(props: FieldProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get location(): string {
    return this.props.location;
  }

  get name(): string {
    return this.props.name;
  }

  get farmerId(): UniqueEntityId {
    return this.props.farmerId;
  }

  static create(
    props: FieldProps,
    id?: UniqueEntityId,
  ): Result<FieldInvalidException, Field> {
    if (isNullOrUndefined(props.name) || props.name.trim() === "") {
      return err(
        new FieldInvalidException("NAME_REQUIRED", "Name is required"),
      );
    }

    if (isNullOrUndefined(props.location) || props.location.trim() === "") {
      return err(
        new FieldInvalidException("LOCATION_REQUIRED", "Location is required"),
      );
    }

    return ok(new Field(props, id));
  }

  static from(id: string, props: FieldProps): Field {
    return new Field(props, new UniqueEntityId(id));
  }
}
