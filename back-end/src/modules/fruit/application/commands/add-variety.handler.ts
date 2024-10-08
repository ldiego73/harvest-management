import { Result, err, ok } from "@common/result";
import { VarietyRepository } from "@modules/fruit/domain/repositories";
import {
  Command,
  CommandHandler,
  CommandHandlerException,
} from "@shared/application";
import { UniqueEntityId } from "@shared/domain";

import { VarietyAlreadyExistsException } from "../exceptions";
import { Variety } from "../../domain/entities";
import { VarietyInvalidException } from "../../domain/exceptions";

type Response = Result<
  | VarietyInvalidException
  | VarietyAlreadyExistsException
  | CommandHandlerException,
  void
>;

export interface AddVarietyCommand extends Command {
  name: string;
  fruitId: string;
}

export class AddVarietyCommandHandler extends CommandHandler<
  AddVarietyCommand,
  Response
> {
  constructor(private readonly repository: VarietyRepository) {
    super();
  }

  async handle(command: AddVarietyCommand): Promise<Response> {
    try {
      const existingVarieties = await this.repository.findAllByFruitId(
        command.fruitId,
      );

      const existingVariety = existingVarieties.find(
        (v) => v.fruitId.toValue() === command.fruitId,
      );

      if (typeof existingVariety !== "undefined") {
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

      await this.repository.save(variety);

      return ok();
    } catch (error: any) {
      return err(CommandHandlerException.create(error.message));
    }
  }
}
