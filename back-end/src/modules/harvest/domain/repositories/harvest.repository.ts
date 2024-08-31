import { Harvest } from "../aggregates";

export interface HarvestRepository {
  findById(id: string): Promise<Harvest>;
  findAllByFruitId(id: string): Promise<Harvest[]>;
  findAllByFarmerId(id: string): Promise<Harvest[]>;
  findAllByClientId(id: string): Promise<Harvest[]>;
  findAll(): Promise<Harvest[]>;

  save(harvest: Harvest): Promise<Harvest>;
}
