import { Farmer } from "../aggregates";

export interface FarmerRepository {
  findById(id: string): Promise<Farmer>;
  findByEmail(email: string): Promise<Farmer>;
  findAll(): Promise<Farmer[]>;

  create(farmer: Farmer): Promise<Farmer>;
  update(farmer: Farmer): Promise<Farmer>;
}
