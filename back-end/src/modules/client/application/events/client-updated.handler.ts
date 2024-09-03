import { EventBus } from "@common/event-bus";
import { EventHandler } from "@shared/application";

import { ClientUpdatedEvent } from "@modules/client/domain/events";

export class ClientUpdatedEventHandler extends EventHandler<ClientUpdatedEvent> {
  constructor() {
    super();

    EventBus.subscribe(ClientUpdatedEvent.name, this.handle.bind(this));
  }

  async handle(event: ClientUpdatedEvent): Promise<void> {
    this.logger.info(`Client updated: ${event.getId()}`);
  }
}
