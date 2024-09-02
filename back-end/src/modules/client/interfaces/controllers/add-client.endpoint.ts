import { BaseController, Controller, Post } from "@shared/interface";
import { EmailInvalidException } from "@shared/domain/value-objects";
import {
  AddClientCommandHandler,
  ClientAlreadyExistsException,
} from "@modules/client/application";
import { ClientInvalidException } from "@modules/client/domain/exceptions";

import { Context } from "elysia";

import { ClientRequestDto } from "../dtos";

type IndexRoute = {
  body: {
    email: string;
    name: string;
    lastName: string;
  };
};

@Controller("/clients", "Clients")
export class AddClientEndpoint extends BaseController {
  constructor(
    private readonly addClientCommandHandler: AddClientCommandHandler,
  ) {
    super();
  }
  @Post({ path: "/", description: "Add a client", body: ClientRequestDto })
  async index(ctx: Context<IndexRoute>) {
    const { email, name, lastName } = ctx.body;
    const resultOrError = await this.addClientCommandHandler.handle({
      email,
      name,
      lastName,
    });

    if (resultOrError.isErr()) {
      const error = resultOrError.error;

      if (
        error instanceof ClientAlreadyExistsException ||
        error instanceof EmailInvalidException ||
        error instanceof ClientInvalidException
      ) {
        return this.badRequest(error.code, error.message);
      }

      return this.internalServerError(
        resultOrError.error.code,
        resultOrError.error.message,
      );
    }

    ctx.set.status = 201;

    return;
  }
}
