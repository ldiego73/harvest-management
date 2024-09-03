import {
  FindAllQueryHandler,
  FindByIdQueryHandler,
  AddClientCommandHandler,
  UpdateClientCommandHandler,
  ClientCreatedEventHandler,
  ClientUpdatedEventHandler,
} from "./application";
import { ClientRepositoryImpl } from "./infraestructure";
import {
  FindAllEndpoint,
  FindByIdEndpoint,
  AddClientEndpoint,
  UpdateClientEndpoint,
} from "./interfaces";

const repository = new ClientRepositoryImpl();
const findAllQueryHandler = new FindAllQueryHandler(repository);
const findByIdQueryHandler = new FindByIdQueryHandler(repository);
const addClientCommandHandler = new AddClientCommandHandler(repository);
const updateClientCommandHandler = new UpdateClientCommandHandler(repository);

const findAllEndpoint = new FindAllEndpoint(findAllQueryHandler);
const findByIdEndpoint = new FindByIdEndpoint(findByIdQueryHandler);
const addClientEndpoint = new AddClientEndpoint(addClientCommandHandler);
const updateClientEndpoint = new UpdateClientEndpoint(
  updateClientCommandHandler,
);

new ClientCreatedEventHandler();
new ClientUpdatedEventHandler();

export const clientControllers = [
  findAllEndpoint,
  findByIdEndpoint,
  addClientEndpoint,
  updateClientEndpoint,
];
