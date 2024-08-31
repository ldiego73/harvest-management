import { EventBus } from "@common/event-bus";

import { DomainEvent } from "./domain-event";
import { Entity } from "./entity";

export abstract class AggregateRoot<T> extends Entity<T> {
  private _events: DomainEvent[] = [];

  get events(): DomainEvent[] {
    return this._events;
  }

  commit() {
    this._events.forEach((event: DomainEvent) => {
      EventBus.publish(event.constructor.name, event);
    });
    this._events.length = 0;
  }

  protected addDomainEvent(event: DomainEvent) {
    this._events.push(event);
  }

  protected removeDomainEvent(event: DomainEvent) {
    const eventIndex = this._events.findIndex((_event: DomainEvent) =>
      _event.getId().equals(event.getId()),
    );
    if (eventIndex > -1) this._events.splice(eventIndex, 1);
  }

  protected clearDomainEvents() {
    this._events.length = 0;
  }
}
