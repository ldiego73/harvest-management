export enum LogLevel {
  Off = 0,
  Error,
  Warning,
  Info,
  Debug,
}

export class Logger {
  static level = LogLevel.Debug;

  static enableProductionMode(): void {
    Logger.level = LogLevel.Warning;
  }

  private constructor(protected name: string) {}

  static create(name: string): Logger {
    return new Logger(name);
  }

  private log(level: LogLevel, message: string): void {
    if (level > Logger.level) return;

    const levelName: string = LogLevel[level];

    console.log(
      `${new Date().toISOString()} [${levelName.toUpperCase()}] ${this.name}: ${message}`,
    );
  }

  error(message: string): void {
    this.log(LogLevel.Error, message);
  }

  warning(message: string): void {
    this.log(LogLevel.Warning, message);
  }

  info(message: string): void {
    this.log(LogLevel.Info, message);
  }

  debug(message: string): void {
    this.log(LogLevel.Debug, message);
  }
}
