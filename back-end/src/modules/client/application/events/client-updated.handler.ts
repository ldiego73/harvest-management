import { EventHandler } from "@shared/application";

import { ClientUpdatedEvent } from "@modules/client/domain/events";

export class ClientUpdatedEventHandler extends EventHandler<ClientUpdatedEvent> {
  async handle(event: ClientUpdatedEvent): Promise<void> {
    this.logger.info(`Client updated: ${event.getId()}`);
  }
}
