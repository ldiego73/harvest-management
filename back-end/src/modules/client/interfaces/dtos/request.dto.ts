import { t } from "elysia";

export const ClientRequestDto = t.Object({
  email: t.String({ format: "email" }),
  name: t.String({ minLength: 3, maxLength: 50 }),
  lastName: t.String({ minLength: 3, maxLength: 50 }),
});

export const ClientIdParamsDto = t.Object({
  id: t.String({ minLength: 24 }),
});
