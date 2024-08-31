import { Client } from "../aggregates";

export interface ClientRepository {
  findById(id: string): Promise<Client | null>;
  findByEmail(email: string): Promise<Client | null>;
  findAll(): Promise<Client[]>;

  save(client: Client): Promise<Client>;
  update(client: Client, clienId: string): Promise<Client>;
}
