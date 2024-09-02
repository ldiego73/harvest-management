import { t } from "elysia";

export const FarmerRequestDto = t.Object({
  email: t.String({ format: "email" }),
  name: t.String(),
  lastName: t.String(),
  fields: t.Array(
    t.Object({
      name: t.String(),
      location: t.String(),
    }),
  ),
});

export const FieldRequestDto = t.Object({
  name: t.String(),
  location: t.String(),
});

export const FarmerIdParamsDto = t.Object({
  id: t.String({ minLength: 24 }),
});

export const FieldIdParamsDto = t.Object({
  id: t.String({ minLength: 24 }),
});
