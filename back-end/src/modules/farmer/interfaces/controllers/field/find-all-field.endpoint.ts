import { BaseController, Controller, Get } from "@shared/interface";

import { FindAllFieldHandler } from "@modules/farmer/application";
import { FieldListResponseDto } from "@modules/farmer/interfaces/dtos";

import { Context } from "elysia";

@Controller("/fields", "Fields")
export class FindAllFieldEndpoint extends BaseController {
  constructor(private readonly queryhandler: FindAllFieldHandler) {
    super();
  }

  @Get({
    path: "/",
    description: "Find all fields",
    response: FieldListResponseDto,
  })
  async index(ctx: Context) {
    const fieldsOrError = await this.queryhandler.handle();

    if (fieldsOrError.isErr()) {
      return this.internalServerError(
        fieldsOrError.error.code,
        fieldsOrError.error.message,
      );
    }

    const fields = fieldsOrError.value;

    ctx.set.status = 200;
    ctx.set.headers["Content-Type"] = "application/json";

    return fields.map((field) => ({
      id: field.id.toValue(),
      name: field.name,
      location: field.location,
    }));
  }
}
