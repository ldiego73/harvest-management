import {
  FarmerRepositoryImpl,
  FieldRepositoryImpl,
} from "@modules/farmer/infraestructure";
import {
  AddFarmerCommandHandler,
  AddFieldCommandHandler,
  UpdateFarmerComamndHandler,
  UpdateFieldCommandHandler,
  FindAllFarmerHandler,
  FindByIdFarmerHandler,
  FindAllByFamerIdFieldHandler,
  FindAllFieldHandler,
  FindByIdFieldHandler,
  FindByNameAndLocationFieldHandler,
} from "@modules/farmer/application";
import {
  FindAllFarmerEndpoint,
  FindByIdFarmerEndpoint,
  FindAllByFarmerIdFieldEndpoint,
  FindAllFieldEndpoint,
  FindByIdFieldEndpoint,
  FindByNameAndLocationFieldEndpoint,
  AddFieldEndpoint,
  AddFarmerEndpoint,
  UpdateFieldEndpoint,
  UpdateFarmerEndpoint,
} from "./interfaces";

const farmerRepository = new FarmerRepositoryImpl();
const fieldRepository = new FieldRepositoryImpl();

const addFarmerCommandHandler = new AddFarmerCommandHandler(farmerRepository);
const addFieldCommandHandler = new AddFieldCommandHandler(fieldRepository);
const updateFarmerCommandHandler = new UpdateFarmerComamndHandler(
  farmerRepository,
);
const updateFieldCommandHandler = new UpdateFieldCommandHandler(
  fieldRepository,
);
const findAllFarmerHandler = new FindAllFarmerHandler(farmerRepository);
const findByIdFarmerHandler = new FindByIdFarmerHandler(farmerRepository);
const findAllByFarmerIdFieldHandler = new FindAllByFamerIdFieldHandler(
  fieldRepository,
);
const findAllFieldHandler = new FindAllFieldHandler(fieldRepository);
const findByIdFieldHandler = new FindByIdFieldHandler(fieldRepository);
const findByNameAndLocationFieldHandler = new FindByNameAndLocationFieldHandler(
  fieldRepository,
);

export const farmerControllers = [
  new FindAllFarmerEndpoint(findAllFarmerHandler),
  new FindByIdFarmerEndpoint(findByIdFarmerHandler),
  new FindAllByFarmerIdFieldEndpoint(findAllByFarmerIdFieldHandler),
  new FindAllFieldEndpoint(findAllFieldHandler),
  new FindByIdFieldEndpoint(findByIdFieldHandler),
  new FindByNameAndLocationFieldEndpoint(findByNameAndLocationFieldHandler),
  new AddFieldEndpoint(addFieldCommandHandler),
  new AddFarmerEndpoint(addFarmerCommandHandler),
  new UpdateFieldEndpoint(updateFieldCommandHandler),
  new UpdateFarmerEndpoint(updateFarmerCommandHandler),
];
