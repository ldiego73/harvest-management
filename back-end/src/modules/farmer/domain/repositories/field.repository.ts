import { Field } from "../entities";

export interface FieldRepository {
  findById(id: string): Promise<Field | null>;
  findByNameAndLocation(name: string, location: string): Promise<Field | null>;
  findAllByFarmerId(farmerId: string): Promise<Field[]>;
  findAll(): Promise<Field[]>;

  save(field: Field): Promise<Field>;
  update(field: Field, fieldId: string): Promise<Field>;
}
