import { Result, ok, err } from "@common/result";
import { FruitRepository } from "@modules/fruit/domain/repositories";
import {
  Command,
  CommandHandler,
  CommandHandlerException,
} from "@shared/application";

import { FruitAlreadyExistsException } from "../exceptions";
import { Fruit } from "../../domain/aggregates";
import { Variety } from "../../domain/entities";
import {
  FruitInvalidException,
  VarietyInvalidException,
} from "../../domain/exceptions";

type Response = Result<
  | CommandHandlerException
  | FruitAlreadyExistsException
  | FruitInvalidException
  | VarietyInvalidException,
  void
>;

export interface AddFruitCommand extends Command {
  name: string;
  varieties: {
    name: string;
  }[];
}

export class AddFruitCommandHandler extends CommandHandler<
  AddFruitCommand,
  Response
> {
  constructor(private readonly repository: FruitRepository) {
    super();
  }

  async handle(command: AddFruitCommand): Promise<Response> {
    try {
      const existingFruit = await this.repository.findByName(command.name);

      if (existingFruit !== null) {
        return err(new FruitAlreadyExistsException("Fruit already exists"));
      }

      const fruitOrError = Fruit.create({
        name: command.name,
        varieties: [],
      });

      if (fruitOrError.isErr()) {
        return err(fruitOrError.error);
      }

      const fruit = fruitOrError.value;

      const varietiesOrErrors = command.varieties.map((variety) => {
        return Variety.create({
          name: variety.name,
          fruitId: fruit.id,
        });
      });

      if (varietiesOrErrors.some((result) => result.isErr())) {
        return err(varietiesOrErrors.find((result) => result.isErr())!.error);
      }

      const varieties = varietiesOrErrors.map((result) => result.value);

      fruit.varieties = varieties;

      await this.repository.save(fruit);

      fruit.created();
      fruit.commit();

      return ok();
    } catch (error: any) {
      return err(CommandHandlerException.create(error.message));
    }
  }
}
