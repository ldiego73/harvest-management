import { Variety } from "../entities";

export interface VarietyRepository {
  findById(id: string): Variety;
  findAllByFruitId(id: string): Variety[];
  findAll(): Variety[];

  save(variety: Variety): void;
  update(variety: Variety): void;
}
