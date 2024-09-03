import { prisma } from "@shared/infrastructure/database";
import { UniqueEntityId } from "@shared/domain";

import { Harvest } from "../../domain/aggregates";
import { HarvestRepository } from "../../domain/repositories";

export class HarvestRepositoryImpl implements HarvestRepository {
  async findById(id: string): Promise<Harvest | null> {
    const raw = await prisma.harvest.findUnique({
      where: {
        id: id,
      },
    });

    if (raw === null) {
      return null;
    }

    return Harvest.from(raw.id, {
      fruitId: new UniqueEntityId(raw.fruitId),
      varietyId: new UniqueEntityId(raw.varietyId),
      farmerId: new UniqueEntityId(raw.farmerId),
      fieldId: new UniqueEntityId(raw.fieldId),
      clientId: new UniqueEntityId(raw.clientId),
      quantity: raw.quantity,
      date: raw.date,
    });
  }

  async findAllByFruitId(id: string): Promise<Harvest[]> {
    const raw = await prisma.harvest.findMany({
      where: {
        fruitId: id,
      },
    });

    return raw.map((item) => {
      return Harvest.from(item.id, {
        fruitId: new UniqueEntityId(item.fruitId),
        varietyId: new UniqueEntityId(item.varietyId),
        farmerId: new UniqueEntityId(item.farmerId),
        fieldId: new UniqueEntityId(item.fieldId),
        clientId: new UniqueEntityId(item.clientId),
        quantity: item.quantity,
        date: item.date,
      });
    });
  }

  async findAllByVarietyId(id: string): Promise<Harvest[]> {
    const raw = await prisma.harvest.findMany({
      where: {
        varietyId: id,
      },
    });

    return raw.map((item) => {
      return Harvest.from(item.id, {
        fruitId: new UniqueEntityId(item.fruitId),
        varietyId: new UniqueEntityId(item.varietyId),
        farmerId: new UniqueEntityId(item.farmerId),
        fieldId: new UniqueEntityId(item.fieldId),
        clientId: new UniqueEntityId(item.clientId),
        quantity: item.quantity,
        date: item.date,
      });
    });
  }

  async findAllByFarmerId(id: string): Promise<Harvest[]> {
    const raw = await prisma.harvest.findMany({
      where: {
        farmerId: id,
      },
    });

    return raw.map((item) => {
      return Harvest.from(item.id, {
        fruitId: new UniqueEntityId(item.fruitId),
        varietyId: new UniqueEntityId(item.varietyId),
        farmerId: new UniqueEntityId(item.farmerId),
        fieldId: new UniqueEntityId(item.fieldId),
        clientId: new UniqueEntityId(item.clientId),
        quantity: item.quantity,
        date: item.date,
      });
    });
  }

  async findAllByClientId(id: string): Promise<Harvest[]> {
    const raw = await prisma.harvest.findMany({
      where: {
        clientId: id,
      },
    });

    return raw.map((item) => {
      return Harvest.from(item.id, {
        fruitId: new UniqueEntityId(item.fruitId),
        varietyId: new UniqueEntityId(item.varietyId),
        farmerId: new UniqueEntityId(item.farmerId),
        fieldId: new UniqueEntityId(item.fieldId),
        clientId: new UniqueEntityId(item.clientId),
        quantity: item.quantity,
        date: item.date,
      });
    });
  }

  async findByDates(startDate: Date, endDate: Date): Promise<Harvest[]> {
    const raw = await prisma.harvest.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return raw.map((item) => {
      return Harvest.from(item.id, {
        fruitId: new UniqueEntityId(item.fruitId),
        varietyId: new UniqueEntityId(item.varietyId),
        farmerId: new UniqueEntityId(item.farmerId),
        fieldId: new UniqueEntityId(item.fieldId),
        clientId: new UniqueEntityId(item.clientId),
        quantity: item.quantity,
        date: item.date,
      });
    });
  }

  async findAll(): Promise<Harvest[]> {
    const raw = await prisma.harvest.findMany();

    return raw.map((item) => {
      return Harvest.from(item.id, {
        fruitId: new UniqueEntityId(item.fruitId),
        varietyId: new UniqueEntityId(item.varietyId),
        farmerId: new UniqueEntityId(item.farmerId),
        fieldId: new UniqueEntityId(item.fieldId),
        clientId: new UniqueEntityId(item.clientId),
        quantity: item.quantity,
        date: item.date,
      });
    });
  }

  async save(harvest: Harvest): Promise<Harvest> {
    const raw = await prisma.harvest.create({
      data: {
        id: harvest.id.toString(),
        fruitId: harvest.fruitId.toString(),
        varietyId: harvest.varietyId.toString(),
        farmerId: harvest.farmerId.toString(),
        fieldId: harvest.fieldId.toString(),
        clientId: harvest.clientId.toString(),
        quantity: harvest.quantity,
        date: harvest.date,
      },
    });

    return Harvest.from(raw.id, {
      fruitId: new UniqueEntityId(raw.fruitId),
      varietyId: new UniqueEntityId(raw.varietyId),
      farmerId: new UniqueEntityId(raw.farmerId),
      fieldId: new UniqueEntityId(raw.fieldId),
      clientId: new UniqueEntityId(raw.clientId),
      quantity: raw.quantity,
      date: raw.date,
    });
  }

  async upload(rows: any[]): Promise<void> {
    const result = await prisma.$transaction(async (tx) => {
      for (const row of rows) {
        const {
          farmerEmail,
          farmerName,
          farmerLastName,
          clientEmail,
          clientName,
          clientLastName,
          fieldName,
          fieldLocation,
          fruitName,
          varietyName,
        } = row;

        const farmer = await tx.farmer.upsert({
          where: { email: farmerEmail },
          update: { name: farmerName, lastName: farmerLastName },
          create: {
            id: new UniqueEntityId().toString(),
            email: farmerEmail,
            name: farmerName,
            lastName: farmerLastName,
          },
        });

        const client = await tx.client.upsert({
          where: { email: clientEmail },
          update: { name: clientName, lastName: clientLastName },
          create: {
            id: new UniqueEntityId().toString(),
            email: clientEmail,
            name: clientName,
            lastName: clientLastName,
          },
        });

        const field = await tx.field.upsert({
          where: {
            name_location: {
              name: fieldName,
              location: fieldLocation,
            },
          },
          update: { farmerId: farmer.id },
          create: {
            id: new UniqueEntityId().toString(),
            name: fieldName,
            location: fieldLocation,
            farmerId: farmer.id,
          },
        });

        const fruit = await tx.fruit.upsert({
          where: { name: fruitName },
          update: {},
          create: {
            id: new UniqueEntityId().toString(),
            name: fruitName,
          },
        });

        const variety = await tx.variety.upsert({
          where: {
            fruitId_name: { fruitId: fruit.id, name: varietyName },
          },
          update: {},
          create: {
            id: new UniqueEntityId().toString(),
            fruitId: fruit.id,
            name: varietyName,
          },
        });

        await tx.harvest.create({
          data: {
            id: new UniqueEntityId().toString(),
            fruitId: fruit.id,
            varietyId: variety.id,
            farmerId: farmer.id,
            fieldId: field.id,
            clientId: client.id,
            quantity: 1,
            date: new Date(),
          },
        });
      }
    });

    return result;
  }
}
