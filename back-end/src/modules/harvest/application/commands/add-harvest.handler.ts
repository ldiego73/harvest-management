import { Result, ok, err } from "@common/result";
import { HarvestRepository } from "@modules/harvest/domain/repositories";
import {
  FruitRepository,
  VarietyRepository,
} from "@modules/fruit/domain/repositories";
import {
  FarmerRepository,
  FieldRepository,
} from "@modules/farmer/domain/repositories";
import { ClientRepository } from "@modules/client/domain/repositories";
import { Harvest } from "@modules/harvest/domain/aggregates";
import { HarvestInvalidException } from "@modules/harvest/domain/exceptions";
import {
  Command,
  CommandHandler,
  CommandHandlerException,
} from "@shared/application";
import { UniqueEntityId } from "@shared/domain";

import { HarvestNotFoundException } from "../exceptions";

type Response = Result<
  CommandHandlerException | HarvestNotFoundException | HarvestInvalidException,
  void
>;

export interface AddHarvestCommand extends Command {
  fruitId: string;
  varietyId: string;
  farmerId: string;
  fieldId: string;
  clientId: string;
  quantity: number;
  date: Date;
}

export class AddHarvestCommandHandler extends CommandHandler<
  AddHarvestCommand,
  Response
> {
  constructor(
    private readonly repository: HarvestRepository,
    private readonly fruitRepository: FruitRepository,
    private readonly varietyRepository: VarietyRepository,
    private readonly farmerRepository: FarmerRepository,
    private readonly fieldRepository: FieldRepository,
    private readonly clientRepository: ClientRepository,
  ) {
    super();
  }

  async handle(command: AddHarvestCommand): Promise<Response> {
    try {
      await this.validateEntities(command);

      const harvestOrError = Harvest.create({
        fruitId: new UniqueEntityId(command.fruitId),
        varietyId: new UniqueEntityId(command.varietyId),
        farmerId: new UniqueEntityId(command.farmerId),
        fieldId: new UniqueEntityId(command.fieldId),
        clientId: new UniqueEntityId(command.clientId),
        quantity: command.quantity,
        date: command.date,
      });

      if (harvestOrError.isErr()) {
        return err(harvestOrError.error);
      }

      const harvest = harvestOrError.value;

      await this.repository.save(harvest);

      harvest.created();
      harvest.commit();

      return ok();
    } catch (error: any) {
      return err(
        error instanceof CommandHandlerException
          ? error
          : CommandHandlerException.create(error.message),
      );
    }
  }

  private async validateEntities(command: AddHarvestCommand): Promise<void> {
    const entityChecks = [
      { repository: this.fruitRepository, id: command.fruitId, type: "FRUIT" },
      {
        repository: this.varietyRepository,
        id: command.varietyId,
        type: "VARIETY",
      },
      {
        repository: this.farmerRepository,
        id: command.farmerId,
        type: "FARMER",
      },
      { repository: this.fieldRepository, id: command.fieldId, type: "FIELD" },
      {
        repository: this.clientRepository,
        id: command.clientId,
        type: "CLIENT",
      },
    ];

    await Promise.all(
      entityChecks.map(async ({ repository, id, type }) => {
        const entity = await repository.findById(id);
        if (!entity) {
          throw new HarvestNotFoundException(`${type.toLowerCase()} not found`);
        }
      }),
    );
  }
}
