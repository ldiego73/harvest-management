import { BaseController, Controller, Get } from "@shared/interface";

import { FindAllFruitQueryHandler } from "@modules/fruit/application";

import { FruitsResponseDto } from "../../dtos";

import { Context } from "elysia";

@Controller("/fruits", "Fruits")
export class FindAllFruitEndpoint extends BaseController {
  constructor(private readonly commandHandler: FindAllFruitQueryHandler) {
    super();
  }

  @Get({
    path: "/",
    description: "Find all fruits",
    response: FruitsResponseDto,
  })
  async index() {
    const resultOrError = await this.commandHandler.handle();

    if (resultOrError.isErr()) {
      const error = resultOrError.error;

      return this.internalServerError(error.code, error.message);
    }

    return resultOrError.value.map((fruit) => ({
      id: fruit.id.toValue(),
      name: fruit.name,
      varieties: fruit.varieties.map((variety) => ({
        id: variety.id.toValue(),
        name: variety.name,
        fruitId: variety.fruitId.toValue(),
      })),
    }));
  }
}
