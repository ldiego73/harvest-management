import { Result, ok, err } from "@common/result";
import { type ClientRepository } from "@modules/client/domain/repositories";
import {
  type Command,
  CommandHandler,
  CommandHandlerException,
} from "@shared/application";
import { Email, EmailInvalidException } from "@shared/domain/value-objects";

import { ClientAlreadyExistsException } from "../exceptions";
import { Client } from "../../domain/aggregates";
import { ClientInvalidException } from "../../domain/exceptions";

type Response = Result<
  | ClientAlreadyExistsException
  | EmailInvalidException
  | ClientInvalidException
  | CommandHandlerException,
  void
>;

export interface AddClientCommand extends Command {
  email: string;
  name: string;
  lastName: string;
}

export class AddClientCommandHandler extends CommandHandler<
  AddClientCommand,
  Response
> {
  constructor(private readonly repository: ClientRepository) {
    super();
  }

  async handle(command: AddClientCommand): Promise<Response> {
    try {
      const existingClient = await this.repository.findByEmail(command.email);

      if (existingClient !== null) {
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

      await this.repository.save(client);

      client.created();
      client.commit();

      return ok();
    } catch (error: any) {
      return err(CommandHandlerException.create(error.message));
    }
  }
}
