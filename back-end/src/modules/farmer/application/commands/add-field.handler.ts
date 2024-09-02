import { Result, err, ok } from "@common/result";
import { FieldRepository } from "@modules/farmer/domain/repositories";
import {
  Command,
  CommandHandler,
  CommandHandlerException,
} from "@shared/application";
import { UniqueEntityId } from "@shared/domain";

import { FieldAlreadyExistsException } from "../exceptions";
import { Field } from "../../domain/entities";
import { FieldInvalidException } from "../../domain/exceptions";

type Response = Result<
  FieldInvalidException | FieldAlreadyExistsException | CommandHandlerException,
  void
>;

export interface AddFieldCommand extends Command {
  name: string;
  location: string;
  farmerId: string;
}

export class AddFieldCommandHandler extends CommandHandler<
  AddFieldCommand,
  Response
> {
  constructor(private readonly repository: FieldRepository) {
    super();
  }

  async handle(command: AddFieldCommand): Promise<Response> {
    try {
      const existingField = await this.repository.findByNameAndLocation(
        command.name,
        command.location,
      );

      if (existingField !== null) {
        return err(new FieldAlreadyExistsException("Field already exists"));
      }

      const fieldOrError = Field.create({
        name: command.name,
        location: command.location,
        farmerId: new UniqueEntityId(command.farmerId),
      });

      if (fieldOrError.isErr()) {
        return err(fieldOrError.error);
      }

      const field = fieldOrError.value;

      await this.repository.save(field);

      return ok();
    } catch (error: any) {
      return err(CommandHandlerException.create(error.message));
    }
  }
}
