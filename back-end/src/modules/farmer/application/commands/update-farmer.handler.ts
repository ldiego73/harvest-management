import { Result, ok, err } from "@common/result";
import { FarmerRepository } from "@modules/farmer/domain/repositories";
import {
  Command,
  CommandHandler,
  CommandHandlerException,
} from "@shared/application";
import { Email, EmailInvalidException } from "@shared/domain/value-objects";

import {
  FarmerNotFoundException,
  FarmerAlreadyExistsException,
} from "../exceptions";
import { Farmer } from "../../domain/aggregates";
import { Field } from "../../domain/entities";
import {
  FarmerInvalidException,
  FieldInvalidException,
} from "../../domain/exceptions";

type Response = Result<
  | CommandHandlerException
  | FarmerNotFoundException
  | FarmerAlreadyExistsException
  | FieldInvalidException
  | EmailInvalidException
  | FarmerInvalidException,
  void
>;

export interface UpdateFarmerComamnd extends Command {
  id: string;
  email: string;
  name: string;
  lastName: string;
  fields: {
    name: string;
    location: string;
  }[];
}

export class UpdateFarmerComamndHandler extends CommandHandler<
  UpdateFarmerComamnd,
  Response
> {
  constructor(private readonly repository: FarmerRepository) {
    super();
  }

  async handle(command: UpdateFarmerComamnd): Promise<Response> {
    try {
      const existingFarmer = await this.repository.findById(command.id);

      if (existingFarmer === null) {
        return err(new FarmerNotFoundException("Farmer not found"));
      }

      const emailExists = await this.repository.findByEmail(command.email);

      if (emailExists !== null && emailExists.email.value !== command.email) {
        return err(new FarmerAlreadyExistsException("Email already exists"));
      }

      const email = Email.create(command.email);

      if (email.isErr()) {
        return err(email.error);
      }

      const farmerOrError = Farmer.create({
        email: email.value,
        name: command.name,
        lastName: command.lastName,
        fields: [],
      });

      if (farmerOrError.isErr()) {
        return err(farmerOrError.error);
      }

      const farmer = farmerOrError.value;

      const fieldsOrErrors = command.fields.map((field) => {
        return Field.create({
          name: field.name,
          location: field.location,
          farmerId: farmer.id,
        });
      });

      if (fieldsOrErrors.some((result) => result.isErr())) {
        return err(fieldsOrErrors.find((result) => result.isErr())!.error);
      }

      const fields = fieldsOrErrors.map((result) => result.value);

      farmer.fields = fields;

      await this.repository.update(farmer, command.id);

      farmer.updated();
      farmer.commit();

      return ok();
    } catch (error: any) {
      return err(CommandHandlerException.create(error.message));
    }
  }
}
