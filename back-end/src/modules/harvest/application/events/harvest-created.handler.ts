import { EventHandler } from "@shared/application";

import { HarvestCreatedEvent } from "@modules/harvest/domain/events";

export class FruitCreatedEventHandler extends EventHandler<HarvestCreatedEvent> {
  async handle(event: HarvestCreatedEvent): Promise<void> {
    this.logger.info(`Harvest created: ${event.getId()}`);
  }
}
