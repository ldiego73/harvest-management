import { BaseController, Controller, Get } from "@shared/interface";
import { FindAllByFruitIdVarietyQueryHandler } from "@modules/fruit/application";

import { Context } from "elysia";

import { VarietiesResponseDto } from "../../dtos";

type IndexRoute = {
  params: {
    fruitId: string;
  };
};

@Controller("/varieties", "Varieties")
export class FindAllByFruitIdVarietyEndpoint extends BaseController {
  constructor(
    private readonly commandHandler: FindAllByFruitIdVarietyQueryHandler,
  ) {
    super();
  }

  @Get({
    path: "/fruit/:fruitId",
    description: "Find all varieties by fruit id",
    response: VarietiesResponseDto,
  })
  async index(ctx: Context<IndexRoute>) {
    const { fruitId } = ctx.params;
    const resultOrError = await this.commandHandler.handle({
      id: fruitId,
    });

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
