import { DomainEvent, UniqueEntityId } from "@shared/domain";

import { Harvest } from "../aggregates";

export class HarvestCreatedEvent implements DomainEvent {
  occurredAt: Date;

  constructor(public harvest: Harvest) {
    this.occurredAt = new Date();
  }

  getId(): UniqueEntityId {
    return this.harvest.id;
  }
}
