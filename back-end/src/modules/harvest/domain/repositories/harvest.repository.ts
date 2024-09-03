import { Harvest } from "../aggregates";

export interface HarvestRepository {
  findById(id: string): Promise<Harvest | null>;
  findAllByFruitId(id: string): Promise<Harvest[]>;
  findAllByFarmerId(id: string): Promise<Harvest[]>;
  findAllByClientId(id: string): Promise<Harvest[]>;
  findByDates(startDate: Date, endDate: Date): Promise<Harvest[]>;
  findAll(): Promise<Harvest[]>;
  upload(rows: any[]): Promise<void>;

  save(harvest: Harvest): Promise<Harvest>;
}
