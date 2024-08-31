import { isNullOrUndefined } from "@common/helpers";
import { Result, ok, err } from "@common/result";
import { UniqueEntityId } from "@shared/domain";
import { AggregateRoot } from "@shared/domain/aggregate-root";
import { Exception } from "@common/exception";

import { Variety } from "../entities";
import { FruitInvalidException } from "../exceptions";

export type FruitProps = {
  readonly name: string;
  varieties: Variety[];
};

export class Fruit extends AggregateRoot<FruitProps> {
  private constructor(props: FruitProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get varieties(): Variety[] {
    return this.props.varieties;
  }

  addVairiety(variety: Variety): Result<Exception, void> {
    if (this.varieties.find((v) => v.name === variety.name)) {
      return err(
        new FruitInvalidException(
          "VARIETY_ALREADY_EXISTS",
          "Variety already exists",
        ),
      );
    }

    this.props.varieties.push(variety);

    return ok();
  }

  removeVariety(variety: Variety): Result<Exception, void> {
    if (!this.varieties.find((v) => v.name === variety.name)) {
      return err(
        new FruitInvalidException(
          "VARIETY_NOT_EXISTS",
          "Variety does not exists",
        ),
      );
    }

    this.props.varieties = this.props.varieties.filter(
      (v) => v.name !== variety.name,
    );

    return ok();
  }

  static create(
    props: FruitProps,
    id?: UniqueEntityId,
  ): Result<Exception, Fruit> {
    if (isNullOrUndefined(props.name) || props.name.trim() === "") {
      return err(
        new FruitInvalidException("NAME_REQUIRED", "Name is required"),
      );
    }

    return ok(new Fruit(props, id));
  }

  static get(id: string, props: FruitProps): Fruit {
    return new Fruit(props, new UniqueEntityId(id));
  }
}
