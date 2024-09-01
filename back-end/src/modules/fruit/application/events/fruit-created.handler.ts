import { EventHandler } from "@shared/application";

import { FruitCreatedEvent } from "@modules/fruit/domain/events";

export class FruitCreatedEventHandler extends EventHandler<FruitCreatedEvent> {
  async handle(event: FruitCreatedEvent): Promise<void> {
    this.logger.info(`Fruit created: ${event.getId()}`);
  }
}
