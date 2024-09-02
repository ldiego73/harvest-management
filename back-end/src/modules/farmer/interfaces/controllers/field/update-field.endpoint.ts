import { BaseController, Controller, Put } from "@shared/interface";

import {
  FieldNotFoundException,
  FieldAlreadyExistsException,
  UpdateFieldCommandHandler,
} from "@modules/farmer/application";
import { FieldInvalidException } from "@modules/farmer/domain/exceptions";

import { Context } from "elysia";

type IndexRoute = {
  body: {
    name: string;
    location: string;
    farmerId: string;
  };
  params: {
    id: string;
  };
};

@Controller("/fields", "Fields")
export class UpdateFieldEndpoint extends BaseController {
  constructor(private readonly commandHandler: UpdateFieldCommandHandler) {
    super();
  }

  @Put({ path: "/:id", description: "Update a field" })
  async index(ctx: Context<IndexRoute>) {
    const { name, location, farmerId } = ctx.body;
    const { id } = ctx.params;

    const resultOrError = await this.commandHandler.handle({
      id,
      name,
      location,
      farmerId,
    });

    if (resultOrError.isErr()) {
      const error = resultOrError.error;

      if (error instanceof FieldNotFoundException) {
        return this.notFound(error.code, error.message);
      }

      if (error instanceof FieldAlreadyExistsException) {
        return this.conflict(error.code, error.message);
      }

      if (error instanceof FieldInvalidException) {
        return this.badRequest(error.code, error.message);
      }

      return this.internalServerError(error.code, error.message);
    }

    ctx.set.status = 204;
  }
}
