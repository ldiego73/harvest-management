import { Fruit } from "../aggregates";

export interface FruitRepository {
  findById(id: string): Fruit;
  findAll(): Fruit[];

  save(fruit: Fruit): void;
  update(fruit: Fruit): void;
}
