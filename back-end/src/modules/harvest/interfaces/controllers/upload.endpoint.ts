import { BaseController, Controller, Post } from "@shared/interface";
import { UploadHarvestCommandHandler } from "@modules/harvest/application";

import { Context } from "elysia";

import { HarvestImportRequestDto } from "../dtos";

type IndexRoute = {
  body: {
    file: File;
  };
};

@Controller("/harvests", "Harvests")
export class UploadHarvestEndpoint extends BaseController {
  constructor(private readonly commandHandler: UploadHarvestCommandHandler) {
    super();
  }

  @Post({
    path: "/upload",
    description: "Upload a harvest",
    body: HarvestImportRequestDto,
  })
  async index(ctx: Context<IndexRoute>) {
    const { file } = ctx.body;

    if (!file || file.type !== "text/csv") {
      return this.badRequest("INVALID_FILE", "Please provide a valid CSV file");
    }

    const csvContent = await file.text();

    const resultOrError = await this.commandHandler.handle({
      fileContent: csvContent,
    });

    if (resultOrError.isErr()) {
      return this.internalServerError(
        resultOrError.error.code,
        resultOrError.error.message,
      );
    }

    ctx.set.status = 201;
  }
}
