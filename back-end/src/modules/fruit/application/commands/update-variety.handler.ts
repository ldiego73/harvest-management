import { Result, err, ok } from "@common/result";
import { VarietyRepository } from "@modules/fruit/domain/repositories";
import {
  Command,
  CommandHandler,
  CommandHandlerException,
} from "@shared/application";
import { UniqueEntityId } from "@shared/domain";

import {
  VarietyAlreadyExistsException,
  VarietyNotFoundException,
} from "../exceptions";
import { Variety } from "../../domain/entities";
import { VarietyInvalidException } from "../../domain/exceptions";

type Response = Result<
  | VarietyInvalidException
  | VarietyAlreadyExistsException
  | VarietyNotFoundException
  | CommandHandlerException,
  void
>;

export interface UpdateVarietyCommand extends Command {
  id: string;
  name: string;
  fruitId: string;
}

export class UpdateVarietyCommandHandler extends CommandHandler<
  UpdateVarietyCommand,
  Response
> {
  constructor(private readonly repository: VarietyRepository) {
    super();
  }

  async handle(command: UpdateVarietyCommand): Promise<Response> {
    try {
      const foundVariety = await this.repository.findById(command.id);

      if (foundVariety === null) {
        return err(new VarietyNotFoundException("Variety not found"));
      }

      const existingVarieties = await this.repository.findAllByFruitId(
        command.fruitId,
      );

      const existingVariety = existingVarieties.find(
        (v) => v.fruitId.toValue() === command.fruitId,
      );

      if (
        typeof existingVariety !== "undefined" &&
        existingVariety.name !== command.name
      ) {
        return err(new VarietyAlreadyExistsException("Variety already exists"));
      }

      const varietyOrError = Variety.create({
        name: command.name,
        fruitId: new UniqueEntityId(command.fruitId),
      });

      if (varietyOrError.isErr()) {
        return err(varietyOrError.error);
      }

      const variety = varietyOrError.value;

      await this.repository.update(variety, command.id);

      return ok();
    } catch (error: any) {
      return err(CommandHandlerException.create(error.message));
    }
  }
}
