import { Result, err, ok } from "@common/result";
import { FieldRepository } from "@modules/farmer/domain/repositories";
import {
  Command,
  CommandHandler,
  CommandHandlerException,
} from "@shared/application";
import { UniqueEntityId } from "@shared/domain";

import {
  FieldNotFoundException,
  FieldAlreadyExistsException,
} from "../exceptions";
import { Field } from "../../domain/entities";
import { FieldInvalidException } from "../../domain/exceptions";

type Response = Result<
  | FieldInvalidException
  | FieldNotFoundException
  | FieldAlreadyExistsException
  | CommandHandlerException,
  void
>;

export interface UpdateFieldCommand extends Command {
  id: string;
  name: string;
  location: string;
  farmerId: string;
}

export class UpdateFieldCommandHandler extends CommandHandler<
  UpdateFieldCommand,
  Response
> {
  private constructor(private readonly repository: FieldRepository) {
    super();
  }

  async handle(command: UpdateFieldCommand): Promise<Response> {
    try {
      const existingField = await this.repository.findByNameAndLocation(
        command.name,
        command.location,
      );

      if (existingField === null) {
        return err(new FieldNotFoundException("Field not found"));
      }

      const existsNameAndLocation = await this.repository.findByNameAndLocation(
        command.name,
        command.location,
      );

      if (
        existsNameAndLocation !== null &&
        existsNameAndLocation.location !== command.location &&
        existsNameAndLocation.name !== command.name
      ) {
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

      await this.repository.update(field, command.id);

      return ok();
    } catch (error: any) {
      return err(CommandHandlerException.create(error.message));
    }
  }
}
