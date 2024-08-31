import { DomainEvent, UniqueEntityId } from "@shared/domain";

import { Farmer } from "../aggregates";

export class FarmerUpdatedEvent implements DomainEvent {
  occurredAt: Date;

  constructor(private farmer: Farmer) {
    this.occurredAt = new Date();
  }

  getId(): UniqueEntityId {
    return this.farmer.id;
  }
}
