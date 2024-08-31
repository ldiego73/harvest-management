import { EventHandler } from "@shared/application";

import { FarmerUpdatedEvent } from "@modules/farmer/domain/events";

export class FarmerUpdatedEventHandler extends EventHandler<FarmerUpdatedEvent> {
  async handle(event: FarmerUpdatedEvent): Promise<void> {
    this.logger.info(`Farmer updated: ${event.getId()}`);
  }
}
