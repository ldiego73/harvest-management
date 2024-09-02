import { t } from "elysia";

export const FarmerResponseDto = t.Object({
  id: t.String({ minLength: 24 }),
  email: t.String({ format: "email" }),
  name: t.String(),
  lastName: t.String(),
  fields: t.Array(
    t.Object({
      id: t.String({ minLength: 24 }),
      name: t.String(),
      location: t.String(),
    }),
  ),
});

export const FieldResponseDto = t.Object({
  id: t.String({ minLength: 24 }),
  name: t.String(),
  location: t.String(),
});

export const FarmerListResponseDto = t.Array(FarmerResponseDto);
export const FieldListResponseDto = t.Array(FieldResponseDto);
