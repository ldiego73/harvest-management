import { prisma } from "@shared/infrastructure/database";
import { UniqueEntityId } from "@shared/domain";
import { Email } from "@shared/domain/value-objects";

import { Farmer } from "../../domain/aggregates";
import { Field } from "../../domain/entities";
import { FarmerRepository } from "../../domain/repositories";

export class FarmerRepositoryImpl implements FarmerRepository {
  async findById(id: string): Promise<Farmer | null> {
    const raw = await prisma.farmer.findUnique({
      where: {
        id: id,
      },
      include: {
        fields: true,
      },
    });

    if (raw === null) {
      return null;
    }

    return Farmer.from(raw.id, {
      email: Email.fromString(raw.email),
      name: raw.name,
      lastName: raw.lastName,
      fields: raw.fields.map((item) => {
        return Field.from(item.id, {
          name: item.name,
          location: item.location,
          farmerId: new UniqueEntityId(item.farmerId),
        });
      }),
    });
  }

  async findByEmail(email: string): Promise<Farmer | null> {
    const raw = await prisma.farmer.findUnique({
      where: {
        email: email,
      },
      include: {
        fields: true,
      },
    });

    if (raw === null) {
      return null;
    }

    return Farmer.from(raw.id, {
      email: Email.fromString(raw.email),
      name: raw.name,
      lastName: raw.lastName,
      fields: raw.fields.map((item) => {
        return Field.from(item.id, {
          name: item.name,
          location: item.location,
          farmerId: new UniqueEntityId(item.farmerId),
        });
      }),
    });
  }

  async findAll(): Promise<Farmer[]> {
    const raw = await prisma.farmer.findMany({
      include: {
        fields: true,
      },
    });

    return raw.map((item) => {
      return Farmer.from(item.id, {
        email: Email.fromString(item.email),
        name: item.name,
        lastName: item.lastName,
        fields: item.fields.map((item) => {
          return Field.from(item.id, {
            name: item.name,
            location: item.location,
            farmerId: new UniqueEntityId(item.farmerId),
          });
        }),
      });
    });
  }

  async save(farmer: Farmer): Promise<Farmer> {
    const rawFarmer = await prisma.farmer.create({
      data: {
        id: farmer.id.toString(),
        email: farmer.email.value,
        name: farmer.name,
        lastName: farmer.lastName,
      },
    });

    await prisma.field.createMany({
      data: farmer.fields.map((field) => {
        return {
          id: field.id.toString(),
          name: field.name,
          location: field.location,
          farmerId: rawFarmer.id,
        };
      }),
    });

    return Farmer.from(rawFarmer.id, {
      email: Email.fromString(rawFarmer.email),
      name: rawFarmer.name,
      lastName: rawFarmer.lastName,
      fields: farmer.fields.map((item) => {
        return Field.from(item.id.toString(), {
          name: item.name,
          location: item.location,
          farmerId: item.farmerId,
        });
      }),
    });
  }

  async update(farmer: Farmer, farmerId: string): Promise<Farmer> {
    const raw = await prisma.farmer.update({
      where: {
        id: farmerId,
      },
      data: {
        email: farmer.email.value,
        name: farmer.name,
        lastName: farmer.lastName,
      },
    });

    return Farmer.from(raw.id, {
      email: Email.fromString(raw.email),
      name: raw.name,
      lastName: raw.lastName,
      fields: farmer.fields.map((item) => {
        return Field.from(item.id.toString(), {
          name: item.name,
          location: item.location,
          farmerId: item.farmerId,
        });
      }),
    });
  }
}
