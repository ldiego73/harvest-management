import { isNullOrUndefined } from "@common/helpers";
import { Result, ok, err } from "@common/result";
import { UniqueEntityId } from "@shared/domain";
import { AggregateRoot } from "@shared/domain/aggregate-root";

import { Variety } from "../entities";
import { FruitCreatedEvent, FruitUpdatedEvent } from "../events";
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

  set varieties(varieties: Variety[]) {
    this.props.varieties = varieties;
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

  removeVariety(variety: Variety): Result<FruitInvalidException, void> {
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

  created(): void {
    this.addDomainEvent(new FruitCreatedEvent(this));
  }

  updated(): void {
    this.addDomainEvent(new FruitUpdatedEvent(this));
  }

  static create(
    props: FruitProps,
    id?: UniqueEntityId,
  ): Result<FruitInvalidException, Fruit> {
    if (isNullOrUndefined(props.name) || props.name.trim() === "") {
      return err(
        new FruitInvalidException("NAME_REQUIRED", "Name is required"),
      );
    }

    return ok(new Fruit(props, id));
  }

  static from(id: string, props: FruitProps): Fruit {
    return new Fruit(props, new UniqueEntityId(id));
  }
}
