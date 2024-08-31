import { DomainEvent, UniqueEntityId } from "@shared/domain";

import { Client } from "../aggregates";

export class ClientCreatedEvent implements DomainEvent {
  occurredAt: Date;

  constructor(private client: Client) {
    this.occurredAt = new Date();
  }

  getId(): UniqueEntityId {
    return this.client.id;
  }
}
