import { UniqueEntityId } from "./unique-entity-id";

export interface DomainEvent {
  occurredAt: Date;
  getId(): UniqueEntityId;
}
