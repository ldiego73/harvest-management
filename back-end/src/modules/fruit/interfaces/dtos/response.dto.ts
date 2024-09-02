import { t } from "elysia";

export const FruitResponseDto = t.Object({
  id: t.String({ minLength: 24 }),
  name: t.String({ minLength: 3 }),
  varieties: t.Array(
    t.Object({
      id: t.String({ minLength: 24 }),
      name: t.String(),
    }),
  ),
});

export const VarietyResponseDto = t.Object({
  id: t.String({ minLength: 24 }),
  name: t.String({ minLength: 3 }),
  fruitId: t.String({ minLength: 24 }),
});

export const FruitsResponseDto = t.Array(FruitResponseDto);
export const VarietiesResponseDto = t.Array(VarietyResponseDto);
