import { Result, ok, err } from "@common/result";
import { type ClientRepository } from "@modules/client/domain/repositories";
import {
  type Command,
  CommandHandler,
  CommandHandlerException,
} from "@shared/application";
import { Email, EmailInvalidException } from "@shared/domain/value-objects";

import {
  ClientAlreadyExistsException,
  ClientNotFoundException,
} from "../exceptions";
import { Client } from "../../domain/aggregates";
import { ClientInvalidException } from "../../domain/exceptions";

type Response = Result<
  | ClientNotFoundException
  | ClientAlreadyExistsException
  | EmailInvalidException
  | ClientInvalidException
  | CommandHandlerException,
  void
>;

export interface UpdateClientCommand extends Command {
  id: string;
  email: string;
  name: string;
  lastName: string;
}

export class UpdateClientCommandHandler extends CommandHandler<
  UpdateClientCommand,
  Response
> {
  constructor(private readonly repository: ClientRepository) {
    super();
  }

  async handle(command: UpdateClientCommand): Promise<Response> {
    try {
      const existingClient = await this.repository.findById(command.id);

      if (existingClient !== null) {
        return err(new ClientNotFoundException("Client not found"));
      }

      const emailExists = await this.repository.findByEmail(command.email);

      if (emailExists !== null && emailExists.email.value !== command.email) {
        return err(new ClientAlreadyExistsException("Email already exists"));
      }

      const email = Email.create(command.email);

      if (email.isErr()) {
        return err(email.error);
      }

      const clientOnError = Client.create({
        email: email.value,
        name: command.name,
        lastName: command.lastName,
      });

      if (clientOnError.isErr()) {
        return err(clientOnError.error);
      }

      const client = clientOnError.value;

      await this.repository.update(client, command.id);

      client.updated();
      client.commit();

      return ok();
    } catch (error: any) {
      if (error.code === "P2025") {
        return err(new ClientNotFoundException("Client not found"));
      }

      return err(CommandHandlerException.create(error.message));
    }
  }
}
