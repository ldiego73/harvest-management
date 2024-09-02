import {
  FruitRepositoryImpl,
  VarietyRepositoryImpl,
} from "@modules/fruit/infraestructure";
import {
  AddFruitCommandHandler,
  AddVarietyCommandHandler,
  UpdateVarietyCommandHandler,
  UpdateFruitCommandHandler,
  FindAllVarietyQueryHandler,
  FindAllFruitQueryHandler,
  FindByIdVarietyQueryHandler,
  FindByIdFruitQueryHandler,
  FindAllByFruitIdVarietyQueryHandler,
} from "./application";
import {
  AddFruitEndpoint,
  AddVarietyEndpoint,
  UpdateVarietyEndpoint,
  UpdateFruitEndpoint,
  FindAllVarietyEndpoint,
  FindAllFruitEndpoint,
  FindByIdVarietyEndpoint,
  FindByIdFruitEndpoint,
  FindAllByFruitIdVarietyEndpoint,
} from "./interfaces";

const fruitRepository = new FruitRepositoryImpl();
const varietyRepository = new VarietyRepositoryImpl();
const addFruitCommandHandler = new AddFruitCommandHandler(fruitRepository);
const addVarietyCommandHandler = new AddVarietyCommandHandler(
  varietyRepository,
);
const updateVarietyCommandHandler = new UpdateVarietyCommandHandler(
  varietyRepository,
);
const updateFruitCommandHandler = new UpdateFruitCommandHandler(
  fruitRepository,
);
const findAllVarietyQueryHandler = new FindAllVarietyQueryHandler(
  varietyRepository,
);
const findAllFruitQueryHandler = new FindAllFruitQueryHandler(fruitRepository);
const findByIdVarietyQueryHandler = new FindByIdVarietyQueryHandler(
  varietyRepository,
);
const findByIdFruitQueryHandler = new FindByIdFruitQueryHandler(
  fruitRepository,
);
const findAllByFruitIdVarietyQueryHandler =
  new FindAllByFruitIdVarietyQueryHandler(varietyRepository);

export const fruitControllers = [
  new AddFruitEndpoint(addFruitCommandHandler),
  new AddVarietyEndpoint(addVarietyCommandHandler),
  new UpdateVarietyEndpoint(updateVarietyCommandHandler),
  new UpdateFruitEndpoint(updateFruitCommandHandler),
  new FindAllVarietyEndpoint(findAllVarietyQueryHandler),
  new FindAllFruitEndpoint(findAllFruitQueryHandler),
  new FindByIdVarietyEndpoint(findByIdVarietyQueryHandler),
  new FindByIdFruitEndpoint(findByIdFruitQueryHandler),
  new FindAllByFruitIdVarietyEndpoint(findAllByFruitIdVarietyQueryHandler),
];
