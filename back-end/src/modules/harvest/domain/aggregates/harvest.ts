import { AggregateRoot, UniqueEntityId } from "@shared/domain";
import { isNullOrUndefined } from "@common/helpers";
import { Result, err, ok } from "@common/result";

import { HarvestCreatedEvent } from "../events";
import { HarvestInvalidException } from "../exceptions";

export type HarvestProps = Readonly<{
  fruitId: UniqueEntityId;
  varietyId: UniqueEntityId;
  farmerId: UniqueEntityId;
  fieldId: UniqueEntityId;
  clientId: UniqueEntityId;
  quantity: number;
  date: Date;
}>;

export class Harvest extends AggregateRoot<HarvestProps> {
  private constructor(props: HarvestProps, id?: UniqueEntityId) {
    super(props, id);
  }

  get fruitId(): UniqueEntityId {
    return this.props.fruitId;
  }

  get varietyId(): UniqueEntityId {
    return this.props.varietyId;
  }

  get farmerId(): UniqueEntityId {
    return this.props.farmerId;
  }

  get fieldId(): UniqueEntityId {
    return this.props.fieldId;
  }

  get clientId(): UniqueEntityId {
    return this.props.clientId;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get date(): Date {
    return this.props.date;
  }

  created(): void {
    this.addDomainEvent(new HarvestCreatedEvent(this.props));
  }

  static create(
    props: HarvestProps,
    id?: UniqueEntityId,
  ): Result<HarvestInvalidException, Harvest> {
    if (isNullOrUndefined(props.fruitId)) {
      return err(
        new HarvestInvalidException(
          "FRUIT_ID_REQUIRED",
          "Fruit id is required",
        ),
      );
    }

    if (isNullOrUndefined(props.varietyId)) {
      return err(
        new HarvestInvalidException(
          "VARIETY_ID_REQUIRED",
          "Variety id is required",
        ),
      );
    }

    if (isNullOrUndefined(props.farmerId)) {
      return err(
        new HarvestInvalidException(
          "FARMER_ID_REQUIRED",
          "Farmer id is required",
        ),
      );
    }

    if (isNullOrUndefined(props.fieldId)) {
      return err(
        new HarvestInvalidException(
          "FIELD_ID_REQUIRED",
          "Field id is required",
        ),
      );
    }

    if (isNullOrUndefined(props.clientId)) {
      return err(
        new HarvestInvalidException(
          "CLIENT_ID_REQUIRED",
          "Client id is required",
        ),
      );
    }

    if (isNullOrUndefined(props.quantity)) {
      return err(
        new HarvestInvalidException(
          "QUANTITY_REQUIRED",
          "Quantity is required",
        ),
      );
    }

    if (isNullOrUndefined(props.date)) {
      return err(
        new HarvestInvalidException("DATE_REQUIRED", "Date is required"),
      );
    }

    if (props.quantity <= 0) {
      return err(
        new HarvestInvalidException(
          "QUANTITY_MUST_BE_POSITIVE",
          "Quantity must be positive",
        ),
      );
    }

    if (props.quantity > 100) {
      return err(
        new HarvestInvalidException(
          "QUANTITY_MUST_BE_LESS_THAN_100",
          "Quantity must be less than 100",
        ),
      );
    }

    if (props.date.getTime() < new Date().getTime()) {
      return err(
        new HarvestInvalidException(
          "DATE_MUST_BE_IN_FUTURE",
          "Date must be in future",
        ),
      );
    }

    return ok(new Harvest(props, id));
  }

  static from(id: string, props: HarvestProps): Harvest {
    return new Harvest(props, new UniqueEntityId(id));
  }
}
