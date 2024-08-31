import { DomainEvent, UniqueEntityId } from "@shared/domain";

import { Farmer } from "../aggregates";

export class FarmerCreatedEvent implements DomainEvent {
  occurredAt: Date;

  constructor(private farmer: Farmer) {
    this.occurredAt = new Date();
  }

  getId(): UniqueEntityId {
    return this.farmer.id;
  }
}
