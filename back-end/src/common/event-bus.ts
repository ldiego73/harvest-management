export class EventBus {
  private static events = new Map<string, (...args: any[]) => void>();

  static publish(name: string, ...args: any[]): void {
    if (!this.events.has(name)) return;

    this.events.get(name)!(...args);
  }

  static subscribe(name: string, callback: (...args: any[]) => void): void {
    this.events.set(name, callback);
  }

  static unsubscribe(name: string): void {
    this.events.delete(name);
  }
}
