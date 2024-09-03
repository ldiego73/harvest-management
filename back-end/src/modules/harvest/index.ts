import { HarvestRepositoryImpl } from "./infraestructure";
import {
  FruitRepositoryImpl,
  VarietyRepositoryImpl,
} from "@modules/fruit/infraestructure";
import {
  FarmerRepositoryImpl,
  FieldRepositoryImpl,
} from "@modules/farmer/infraestructure";
import { ClientRepositoryImpl } from "@modules/client/infraestructure";

import {
  FindAllByClientIdQueryHandler,
  FindAllByDatesQueryHandler,
  FindAllByFarmerIdQueryHandler,
  FindAllByFruitIdQueryHandler,
  FindAllQueryHandler,
  FindByIdQueryHandler,
  AddHarvestCommandHandler,
  UploadHarvestCommandHandler,
} from "./application";

import {
  AddHarvestEndpoint,
  FindAllByClientIdHarvestEndpoint,
  FindAllByDatesHarvestEndpoint,
  FindAllByFarmerIdHarvestEndpoint,
  FindAllByFruitIdHarvestEndpoint,
  FindAllHarvestEndpoint,
  FindByIdHarvestEndpoint,
  UploadHarvestEndpoint,
} from "./interfaces";

const repository = new HarvestRepositoryImpl();
const fruitRepository = new FruitRepositoryImpl();
const varietyRepository = new VarietyRepositoryImpl();
const farmerRepository = new FarmerRepositoryImpl();
const fieldRepository = new FieldRepositoryImpl();
const clientRepository = new ClientRepositoryImpl();

const findAllByClientIdQueryHandler = new FindAllByClientIdQueryHandler(
  repository,
);
const findAllByDatesQueryHandler = new FindAllByDatesQueryHandler(repository);
const findAllByFarmerIdQueryHandler = new FindAllByFarmerIdQueryHandler(
  repository,
);
const findAllByFruitIdQueryHandler = new FindAllByFruitIdQueryHandler(
  repository,
);
const findAllQueryHandler = new FindAllQueryHandler(repository);
const findByIdQueryHandler = new FindByIdQueryHandler(repository);
const addHarvestCommandHandler = new AddHarvestCommandHandler(
  repository,
  fruitRepository,
  varietyRepository,
  farmerRepository,
  fieldRepository,
  clientRepository,
);
const uploadHarvestCommandHandler = new UploadHarvestCommandHandler(repository);

const addHarvestEndpoint = new AddHarvestEndpoint(addHarvestCommandHandler);
const findAllByClientIdHarvestEndpoint = new FindAllByClientIdHarvestEndpoint(
  findAllByClientIdQueryHandler,
);
const findAllByDatesHarvestEndpoint = new FindAllByDatesHarvestEndpoint(
  findAllByDatesQueryHandler,
);
const findAllByFarmerIdHarvestEndpoint = new FindAllByFarmerIdHarvestEndpoint(
  findAllByFarmerIdQueryHandler,
);
const findAllByFruitIdHarvestEndpoint = new FindAllByFruitIdHarvestEndpoint(
  findAllByFruitIdQueryHandler,
);
const findAllHarvestEndpoint = new FindAllHarvestEndpoint(findAllQueryHandler);
const findByIdHarvestEndpoint = new FindByIdHarvestEndpoint(
  findByIdQueryHandler,
);
const uploadHarvestEndpoint = new UploadHarvestEndpoint(
  uploadHarvestCommandHandler,
);

export const harvestControllers = [
  addHarvestEndpoint,
  findAllByClientIdHarvestEndpoint,
  findAllByDatesHarvestEndpoint,
  findAllByFarmerIdHarvestEndpoint,
  findAllByFruitIdHarvestEndpoint,
  findAllHarvestEndpoint,
  findByIdHarvestEndpoint,
  uploadHarvestEndpoint,
];
