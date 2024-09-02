import { BaseController, Controller, Post } from "@shared/interface";
import {
  AddFarmerCommandHandler,
  FarmerAlreadyExistsException,
} from "@modules/farmer/application";
import {
  FieldInvalidException,
  FarmerInvalidException,
} from "@modules/farmer/domain/exceptions";
import { EmailInvalidException } from "@shared/domain/value-objects";

import { Context } from "elysia";

import { FarmerRequestDto } from "../../dtos";

type IndexRoute = {
  body: {
    email: string;
    name: string;
    lastName: string;
    fields: {
      name: string;
      location: string;
    }[];
  };
};

@Controller("/farmers", "Farmers")
export class AddFarmerEndpoint extends BaseController {
  constructor(private readonly commandHandler: AddFarmerCommandHandler) {
    super();
  }

  @Post({ path: "/", description: "Add a farmer", body: FarmerRequestDto })
  async index(ctx: Context<IndexRoute>) {
    const { email, name, lastName, fields } = ctx.body;
    const resultOrError = await this.commandHandler.handle({
      email,
      name,
      lastName,
      fields,
    });

    if (resultOrError.isErr()) {
      const error = resultOrError.error;

      if (error instanceof FarmerAlreadyExistsException) {
        return this.conflict(error.code, error.message);
      }

      if (
        error instanceof FieldInvalidException ||
        error instanceof EmailInvalidException ||
        error instanceof FarmerInvalidException
      ) {
        return this.badRequest(error.code, error.message);
      }
      return this.internalServerError(error.code, error.message);
    }

    ctx.set.status = 201;
  }
}
