import { EventHandler } from "@shared/application";

import { FruitUpdatedEvent } from "@modules/fruit/domain/events";

export class FruitUpdatedEventHandler extends EventHandler<FruitUpdatedEvent> {
  async handle(event: FruitUpdatedEvent): Promise<void> {
    this.logger.info(`Fruit updated: ${event.getId()}`);
  }
}
