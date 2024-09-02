import { t } from "elysia";

export const HarvestRequestDto = t.Object({
  fruitId: t.String({ minLength: 24 }),
  varietyId: t.String({ minLength: 24 }),
  farmerId: t.String({ minLength: 24 }),
  fieldId: t.String({ minLength: 24 }),
  clientId: t.String({ minLength: 24 }),
  quantity: t.Number(),
  date: t.String({ format: "date-time" }),
});

export const HarvestIdParamsDto = t.Object({
  id: t.String({ minLength: 24 }),
});
