import { prisma } from "@shared/infrastructure/database";
import { UniqueEntityId } from "@shared/domain";

import { Field } from "../../domain/entities";
import { FieldRepository } from "../../domain/repositories";

export class FieldRepositoryImpl implements FieldRepository {
  async findById(id: string): Promise<Field | null> {
    const raw = await prisma.field.findUnique({
      where: {
        id: id,
      },
    });

    if (raw === null) {
      return null;
    }

    return Field.from(raw.id, {
      name: raw.name,
      location: raw.location,
      farmerId: new UniqueEntityId(raw.farmerId),
    });
  }

  async findAll(): Promise<Field[]> {
    const raw = await prisma.field.findMany();

    return raw.map((item) => {
      return Field.from(item.id, {
        name: item.name,
        location: item.location,
        farmerId: new UniqueEntityId(raw.farmerId),
      });
    });
  }

  async findByNameAndLocation(
    name: string,
    location: string,
  ): Promise<Field | null> {
    const raw = await prisma.field.findFirst({
      where: {
        name,
        location,
      },
    });

    if (raw === null) {
      return null;
    }

    return Field.from(raw.id, {
      name: raw.name,
      location: raw.location,
      farmerId: new UniqueEntityId(raw.farmerId),
    });
  }

  async findAllByFarmerId(farmerId: string): Promise<Field[]> {
    const raw = await prisma.field.findMany({
      where: {
        farmerId: farmerId,
      },
    });

    return raw.map((item) => {
      return Field.from(item.id, {
        name: item.name,
        location: item.location,
        farmerId: new UniqueEntityId(item.farmerId),
      });
    });
  }

  async save(field: Field): Promise<Field> {
    const raw = await prisma.field.create({
      data: {
        id: field.id.toString(),
        name: field.name,
        location: field.location,
        farmerId: field.farmerId.toString(),
      },
    });

    return Field.from(raw.id, {
      name: raw.name,
      location: raw.location,
      farmerId: new UniqueEntityId(raw.farmerId),
    });
  }

  async update(field: Field, fieldId: string): Promise<Field> {
    const raw = await prisma.field.update({
      where: {
        id: fieldId,
      },
      data: {
        name: field.name,
        location: field.location,
        farmerId: field.farmerId.toString(),
      },
    });

    return Field.from(raw.id, {
      name: raw.name,
      location: raw.location,
      farmerId: new UniqueEntityId(raw.farmerId),
    });
  }
}
