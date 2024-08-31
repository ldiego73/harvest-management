import { createId } from "@paralleldrive/cuid2";

export class UniqueEntityId {
  id: string | number;

  constructor(id?: string | number) {
    this.id = id ?? createId();
  }

  equals(id?: UniqueEntityId): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.toValue() === this.toValue();
  }

  toString(): string {
    return String(this.id);
  }

  toValue(): string | number {
    return this.id;
  }
}
