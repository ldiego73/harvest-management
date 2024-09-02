import { BaseController, Controller, Get } from "@shared/interface";

import { FindAllVarietyQueryHandler } from "@modules/fruit/application";

import { Context } from "elysia";

import { VarietiesResponseDto } from "../../dtos";

@Controller("/varieties", "Varieties")
export class FindAllVarietyEndpoint extends BaseController {
  constructor(private readonly commandHandler: FindAllVarietyQueryHandler) {
    super();
  }

  @Get({
    path: "/",
    description: "Find all varieties",
    response: VarietiesResponseDto,
  })
  async index() {
    const resultOrError = await this.commandHandler.handle();

    if (resultOrError.isErr()) {
      const error = resultOrError.error;

      return this.internalServerError(error.code, error.message);
    }

    return resultOrError.value.map((variety) => ({
      id: variety.id.toValue(),
      name: variety.name,
      fruitId: variety.fruitId.toValue(),
    }));
  }
}
