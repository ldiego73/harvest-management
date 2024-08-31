import { Client } from "../aggregates";

export interface ClientRepository {
  findById(clientId: string): Promise<Client>;
  findAll(): Promise<Client[]>;

  save(client: Client): Promise<Client>;
  update(client: Client, clienId: string): Promise<Client>;
}
