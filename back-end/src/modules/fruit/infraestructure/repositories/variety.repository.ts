import { prisma } from "@shared/infrastructure/database";
import { UniqueEntityId } from "@shared/domain";

import { Variety } from "../../domain/entities";
import { VarietyRepository } from "../../domain/repositories";

export class VarietyRepositoryImpl implements VarietyRepository {
  async findById(id: string): Promise<Variety | null> {
    const raw = await prisma.variety.findUnique({
      where: {
        id: id,
      },
    });

    if (raw === null) {
      return null;
    }

    return Variety.from(raw.id, {
      name: raw.name,
      fruitId: new UniqueEntityId(raw.fruitId),
    });
  }

  async findAllByFruitId(id: string): Promise<Variety[]> {
    const raw = await prisma.variety.findMany({
      where: {
        fruitId: id,
      },
    });

    return raw.map((item) => {
      return Variety.from(item.id, {
        name: item.name,
        fruitId: new UniqueEntityId(item.fruitId),
      });
    });
  }

  async findAll(): Promise<Variety[]> {
    const raw = await prisma.variety.findMany();

    return raw.map((item) => {
      return Variety.from(item.id, {
        name: item.name,
        fruitId: new UniqueEntityId(item.fruitId),
      });
    });
  }

  async save(variety: Variety): Promise<Variety> {
    const raw = await prisma.variety.create({
      data: {
        id: variety.id.toString(),
        name: variety.name,
        fruitId: variety.fruitId.toString(),
      },
    });

    return Variety.from(raw.id, {
      name: raw.name,
      fruitId: new UniqueEntityId(raw.fruitId),
    });
  }

  async update(variety: Variety, varietyId: string): Promise<Variety> {
    const raw = await prisma.variety.update({
      where: {
        id: varietyId,
      },
      data: {
        name: variety.name,
        fruitId: variety.fruitId.toString(),
      },
    });

    return Variety.from(raw.id, {
      name: raw.name,
      fruitId: new UniqueEntityId(raw.fruitId),
    });
  }
}
