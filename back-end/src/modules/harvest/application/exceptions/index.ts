import { Exception } from "@common/exception";

export class HarvestNotFoundException extends Exception {
  constructor(message: string) {
    super("HARVEST_NOT_FOUND", message);
  }
}
