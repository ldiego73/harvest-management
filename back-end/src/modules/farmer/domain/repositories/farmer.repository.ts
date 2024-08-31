import { Farmer } from "../aggregates";

export interface FarmerRepository {
  findById(id: string): Promise<Farmer | null>;
  findByEmail(email: string): Promise<Farmer | null>;
  findAll(): Promise<Farmer[]>;

  save(farmer: Farmer): Promise<Farmer>;
  update(farmer: Farmer, farmerId: string): Promise<Farmer>;
}
