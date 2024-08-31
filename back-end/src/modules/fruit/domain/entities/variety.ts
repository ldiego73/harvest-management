import { Entity, UniqueEntityId } from "@shared/domain";
import { Exception } from "@common/exception";
import { isNullOrUndefined } from "@common/helpers";
import { Result, ok, err } from "@common/result";

import { VarietyInvalidException } from "../exceptions";

export type VarietyProps = Readonly<{
  name: string;
  fruitId: UniqueEntityId;
}>;

export class Variety extends Entity<VarietyProps> {
  private constructor(props: VarietyProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get fruitId(): UniqueEntityId {
    return this.props.fruitId;
  }

  static create(
    props: VarietyProps,
    id?: UniqueEntityId,
  ): Result<Exception, Variety> {
    if (isNullOrUndefined(props.name) || props.name.trim() === "") {
      return err(
        new VarietyInvalidException("NAME_REQUIRED", "Name is required"),
      );
    }

    return ok(new Variety(props, id));
  }

  static from(id: string, props: VarietyProps): Variety {
    return new Variety(props, new UniqueEntityId(id));
  }
}
