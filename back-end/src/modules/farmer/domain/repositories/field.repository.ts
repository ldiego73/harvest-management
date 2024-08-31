import { Field } from "../entities";

export interface FieldRepository {
  findById(id: string): Promise<Field>;
  findByNameAndLocation(name: string, location: string): Promise<Field>;
  findAllByFarmerId(farmerId: string): Promise<Field[]>;
  findAll(): Promise<Field[]>;

  create(field: Field): Promise<Field>;
  update(field: Field): Promise<Field>;
}
