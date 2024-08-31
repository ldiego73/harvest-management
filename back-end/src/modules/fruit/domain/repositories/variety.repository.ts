import { Variety } from "../entities";

export interface VarietyRepository {
  findById(id: string): Promise<Variety | null>;
  findAllByFruitId(id: string): Promise<Variety[]>;
  findAll(): Promise<Variety[]>;

  save(variety: Variety): Promise<Variety>;
  update(variety: Variety, varietyId: string): Promise<Variety>;
}
