import { DomainEvent, UniqueEntityId } from "@shared/domain";
import { Fruit } from "../aggregates";

export class FruitCreatedEvent implements DomainEvent {
  occurredAt: Date;

  constructor(public fruit: Fruit) {
    this.occurredAt = new Date();
  }

  getId(): UniqueEntityId {
    return this.fruit.id;
  }
}
