import { BaseController, Controller, Post } from "@shared/interface";
import {
  AddFieldCommandHandler,
  FieldAlreadyExistsException,
} from "@modules/farmer/application";
import { FieldInvalidException } from "@modules/farmer/domain/exceptions";

import { Context } from "elysia";

type IndexRoute = {
  body: {
    name: string;
    location: string;
    farmerId: string;
  };
};

@Controller("/fields", "Fields")
export class AddFieldEndpoint extends BaseController {
  constructor(private readonly commandHandler: AddFieldCommandHandler) {
    super();
  }

  @Post({ path: "/", description: "Add a field" })
  async index(ctx: Context<IndexRoute>) {
    const { name, location, farmerId } = ctx.body;
    const resultOrError = await this.commandHandler.handle({
      name,
      location,
      farmerId,
    });

    if (resultOrError.isErr()) {
      const error = resultOrError.error;

      if (error instanceof FieldAlreadyExistsException) {
        return this.conflict(error.code, error.message);
      }

      if (error instanceof FieldInvalidException) {
        return this.badRequest(error.code, error.message);
      }

      return this.internalServerError(error.code, error.message);
    }

    ctx.set.status = 201;
  }
}
