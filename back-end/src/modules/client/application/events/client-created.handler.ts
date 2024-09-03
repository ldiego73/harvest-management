import { EventBus } from "@common/event-bus";
import { EventHandler } from "@shared/application";

import { ClientCreatedEvent } from "@modules/client/domain/events";

export class ClientCreatedEventHandler extends EventHandler<ClientCreatedEvent> {
  constructor() {
    super();

    EventBus.subscribe(ClientCreatedEvent.name, this.handle.bind(this));
  }

  async handle(event: ClientCreatedEvent): Promise<void> {
    this.logger.info(`Client created: ${event.getId()}`);
  }
}
