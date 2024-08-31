import { prisma } from "@shared/infrastructure/database";
import { Email } from "@shared/domain/value-objects";

import { Client } from "../../domain/aggregates";
import { ClientRepository } from "../../domain/repositories";

export class ClientRepositoryImpl implements ClientRepository {
  async findById(id: string): Promise<Client | null> {
    const raw = await prisma.client.findUnique({
      where: {
        id: id,
      },
    });

    if (raw === null) {
      return null;
    }

    return Client.from(raw.id, {
      email: Email.fromString(raw.email),
      name: raw.name,
      lastName: raw.lastName,
    });
  }

  async findByEmail(email: string): Promise<Client | null> {
    const raw = await prisma.client.findUnique({
      where: {
        email: email,
      },
    });

    if (raw === null) {
      return null;
    }

    return Client.from(raw.id, {
      email: Email.fromString(raw.email),
      name: raw.name,
      lastName: raw.lastName,
    });
  }

  async findAll(): Promise<Client[]> {
    const raw = await prisma.client.findMany();

    return raw.map((item) => {
      return Client.from(item.id, {
        email: Email.fromString(item.email),
        name: item.name,
        lastName: item.lastName,
      });
    });
  }

  async save(client: Client): Promise<Client> {
    const raw = await prisma.client.create({
      data: {
        id: client.id.toString(),
        email: client.email.value,
        name: client.name,
        lastName: client.lastName,
      },
    });

    return Client.from(raw.id, {
      email: client.email,
      name: client.name,
      lastName: client.lastName,
    });
  }

  async update(client: Client, clientId: string): Promise<Client> {
    const raw = await prisma.client.update({
      where: {
        id: clientId,
      },
      data: {
        email: client.email.value,
        name: client.name,
        lastName: client.lastName,
      },
    });

    return Client.from(raw.id, {
      email: client.email,
      name: client.name,
      lastName: client.lastName,
    });
  }
}
