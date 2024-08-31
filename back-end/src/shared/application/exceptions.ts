import { Exception } from "@common/exception";

export class CommandHandlerException extends Exception {
  public constructor(error: string) {
    super(
      "COMMAND_HANDLER_EXCEPTION",
      `An unexpected error occurred: ${error}`,
    );
  }

  public static create(error: string): CommandHandlerException {
    return new CommandHandlerException(error);
  }
}

export class QueryHandlerException extends Exception {
  public constructor(error: string) {
    super("QUERY_HANDLER_EXCEPTION", `An unexpected error occurred: ${error}`);
  }

  public static create(error: string): QueryHandlerException {
    return new QueryHandlerException(error);
  }
}
