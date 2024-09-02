import {
  FarmerNotFoundException,
  FarmerAlreadyExistsException,
  UpdateFarmerComamndHandler,
} from "@modules/farmer/application";
import { BaseController, Controller, Put } from "@shared/interface";
import { FarmerInvalidException } from "@modules/farmer/domain/exceptions";
import { EmailInvalidException } from "@shared/domain/value-objects";
import { FieldInvalidException } from "@modules/farmer/domain/exceptions";

import { Context } from "elysia";

import { FarmerRequestDto, FarmerIdParamsDto } from "../../dtos";

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
  params: {
    id: string;
  };
};

@Controller("/farmers", "Farmers")
export class UpdateFarmerEndpoint extends BaseController {
  constructor(private readonly commandHandler: UpdateFarmerComamndHandler) {
    super();
  }

  @Put({
    path: "/:id",
    description: "Update a farmer",
    body: FarmerRequestDto,
    params: FarmerIdParamsDto,
  })
  async index(ctx: Context<IndexRoute>) {
    const { email, name, lastName, fields } = ctx.body;
    const { id } = ctx.params;

    const resultOrError = await this.commandHandler.handle({
      id,
      email,
      name,
      lastName,
      fields,
    });

    if (resultOrError.isErr()) {
      const error = resultOrError.error;

      if (error instanceof FarmerNotFoundException) {
        return this.notFound(error.code, error.message);
      }

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

    ctx.set.status = 204;
  }
}
