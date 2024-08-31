import { DomainEvent, UniqueEntityId } from "@shared/domain";

import { Client } from "../aggregates";

export class ClientUpdatedEvent implements DomainEvent {
  occurredAt: Date;

  constructor(public client: Client) {
    this.occurredAt = new Date();
  }

  getId(): UniqueEntityId {
    return this.client.id;
  }
}
