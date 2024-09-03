import { Result, ok, err } from "@common/result";
import { HarvestRepository } from "@modules/harvest/domain/repositories";
import { HarvestInvalidException } from "@modules/harvest/domain/exceptions";
import {
  Command,
  CommandHandler,
  CommandHandlerException,
} from "@shared/application";

type Response = Result<CommandHandlerException | HarvestInvalidException, void>;
type HarvestRow = {
  farmerEmail: string;
  farmerName: string;
  farmerLastName: string;
  clientEmail: string;
  clientName: string;
  clientLastName: string;
  fieldName: string;
  fieldLocation: string;
  fruitName: string;
  varietyName: string;
};

export interface UploadHarvestCommand extends Command {
  fileContent: string;
}
export class UploadHarvestCommandHandler extends CommandHandler<
  UploadHarvestCommand,
  Response
> {
  constructor(private readonly repository: HarvestRepository) {
    super();
  }

  async handle(command: UploadHarvestCommand): Promise<Response> {
    try {
      const rows = this.parseCSV(command.fileContent);

      await this.repository.upload(rows);

      return ok();
    } catch (error: any) {
      return err(
        error instanceof CommandHandlerException
          ? error
          : CommandHandlerException.create(error.message),
      );
    }
  }

  private parseCSV(fileContent: string): HarvestRow[] {
    const lines = fileContent.split("\n").slice(1);
    const parseLine = (line: string): HarvestRow => {
      const [
        farmerEmail,
        farmerName,
        farmerLastName,
        clientEmail,
        clientName,
        clientLastName,
        fieldName,
        fieldLocation,
        fruitName,
        varietyName,
      ] = line.split(";");

      return {
        farmerEmail,
        farmerName,
        farmerLastName,
        clientEmail,
        clientName,
        clientLastName,
        fieldName,
        fieldLocation,
        fruitName,
        varietyName,
      };
    };
    const isValidRow = (item: HarvestRow) => item.farmerEmail !== "";
    const defaultValue = (value: string) => value || "unknown";
    const defaultEmail = (email: string) => email || "unknown@email.com";
    const setDefaultValues = (item: HarvestRow) => ({
      farmerEmail: defaultEmail(item.farmerEmail),
      farmerName: defaultValue(item.farmerName),
      farmerLastName: defaultValue(item.farmerLastName),
      clientEmail: defaultEmail(item.clientEmail),
      clientName: defaultValue(item.clientName),
      clientLastName: defaultValue(item.clientLastName),
      fieldName: defaultValue(item.fieldName),
      fieldLocation: defaultValue(item.fieldLocation),
      fruitName: defaultValue(item.fruitName),
      varietyName: defaultValue(item.varietyName.replace("\r", "")),
    });

    return lines.map(parseLine).filter(isValidRow).map(setDefaultValues);
  }
}
