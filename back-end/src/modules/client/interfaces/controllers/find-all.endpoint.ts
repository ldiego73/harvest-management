import { BaseController, Controller, Get } from "@shared/interface";
import { FindAllQueryHandler } from "../../application";

import { Context } from "elysia";

import { ClientsListResponseDto } from "../dtos";

@Controller("/clients", "Clients")
export class FindAllEndpoint extends BaseController {
  constructor(private readonly queryHandler: FindAllQueryHandler) {
    super();
  }

  @Get({
    path: "/",
    description: "Find all clients",
    response: ClientsListResponseDto,
  })
  async index(ctx: Context) {
    const clientsOrError = await this.queryHandler.handle();

    if (clientsOrError.isErr()) {
      this.internalServerError(
        clientsOrError.error.code,
        clientsOrError.error.message,
      );
    }

    ctx.set.headers["content-type"] = "application/json";

    const clients = clientsOrError.value;

    return clients.map((client) => {
      return {
        id: client.id.toString(),
        email: client.email.value,
        name: client.name,
        lastName: client.lastName,
      };
    });
  }
}
