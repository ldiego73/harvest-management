import { EventHandler } from "@shared/application";

import { FarmerCreatedEvent } from "@modules/farmer/domain/events";

export class FarmerCreatedEventHandler extends EventHandler<FarmerCreatedEvent> {
  async handle(event: FarmerCreatedEvent): Promise<void> {
    this.logger.info(`Farmer created: ${event.getId()}`);
  }
}
