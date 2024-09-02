import { t } from "elysia";

export const HarvestResponseDto = t.Object({
  id: t.String({ minLength: 24 }),
  fruitId: t.String({ minLength: 24 }),
  varietyId: t.String({ minLength: 24 }),
  farmerId: t.String({ minLength: 24 }),
  fieldId: t.String({ minLength: 24 }),
  clientId: t.String({ minLength: 24 }),
  quantity: t.Number(),
  date: t.String({ format: "date-time" }),
});
