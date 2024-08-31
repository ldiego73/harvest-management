import { Fruit } from "../aggregates";

export interface FruitRepository {
  findById(id: string): Promise<Fruit | null>;
  findAll(): Promise<Fruit[]>;

  save(fruit: Fruit): Promise<Fruit>;
  update(fruit: Fruit, fruitId: string): Promise<Fruit>;
}
