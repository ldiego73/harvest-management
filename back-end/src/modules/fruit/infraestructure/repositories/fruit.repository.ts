import { prisma } from "@shared/infrastructure/database";
import { UniqueEntityId } from "@shared/domain";

import { Fruit } from "../../domain/aggregates";
import { Variety } from "../../domain/entities";
import { FruitRepository } from "../../domain/repositories";

export class FruitRepositoryImpl implements FruitRepository {
  async findById(id: string): Promise<Fruit | null> {
    const raw = await prisma.fruit.findUnique({
      where: {
        id: id,
      },
      include: {
        varieties: true,
      },
    });

    if (raw === null) {
      return null;
    }

    return Fruit.from(raw.id, {
      name: raw.name,
      varieties: raw.varieties.map((item) => {
        return Variety.from(item.id, {
          name: item.name,
          fruitId: new UniqueEntityId(item.fruitId),
        });
      }),
    });
  }

  async findAll(): Promise<Fruit[]> {
    const raw = await prisma.fruit.findMany({
      include: {
        varieties: true,
      },
    });

    return raw.map((item) => {
      return Fruit.from(item.id, {
        name: item.name,
        varieties: item.varieties.map((item) => {
          return Variety.from(item.id, {
            name: item.name,
            fruitId: new UniqueEntityId(item.fruitId),
          });
        }),
      });
    });
  }

  async save(fruit: Fruit): Promise<Fruit> {
    const result = await prisma.$transaction(async (tx) => {
      const raw = await prisma.fruit.create({
        data: {
          id: fruit.id.toString(),
          name: fruit.name,
        },
      });

      await prisma.variety.createMany({
        data: fruit.varieties.map((variety) => {
          return {
            id: variety.id.toString(),
            name: variety.name,
            fruitId: raw.id,
          };
        }),
      });

      return Fruit.from(raw.id, {
        name: raw.name,
        varieties: fruit.varieties.map((item) => {
          return Variety.from(item.id.toString(), {
            name: item.name,
            fruitId: item.fruitId,
          });
        }),
      });
    });

    return result;
  }

  async update(fruit: Fruit, fruitId: string): Promise<Fruit> {
    const raw = await prisma.fruit.update({
      where: {
        id: fruitId,
      },
      data: {
        name: fruit.name,
      },
    });

    return Fruit.from(raw.id, {
      name: raw.name,
      varieties: fruit.varieties.map((item) => {
        return Variety.from(item.id.toString(), {
          name: item.name,
          fruitId: item.fruitId,
        });
      }),
    });
  }
}
