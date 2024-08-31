import { EventHandler } from "@shared/application";

import { ClientCreatedEvent } from "@modules/client/domain/events";

export class ClientCreatedEventHandler extends EventHandler<ClientCreatedEvent> {
  async handle(event: ClientCreatedEvent): Promise<void> {
    this.logger.info(`Client created: ${event.getId()}`);
  }
}
