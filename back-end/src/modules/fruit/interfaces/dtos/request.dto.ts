import { t } from "elysia";

export const FruitRequestDto = t.Object({
  name: t.String({ minLength: 3 }),
  varieties: t.Array(
    t.Object({
      name: t.String(),
    }),
  ),
});

export const VarietyRequestDto = t.Object({
  name: t.String({ minLength: 3 }),
  fruitId: t.String({ minLength: 24 }),
});

export const FruitIdRequestDto = t.Object({
  id: t.String({ minLength: 24 }),
});

export const VarietyIdRequestDto = t.Object({
  id: t.String({ minLength: 24 }),
});
