import { t } from "elysia";

export const ClientResponseDto = t.Object({
  id: t.String({ minLength: 24 }),
  email: t.String({ format: "email" }),
  name: t.String({ minLength: 3, maxLength: 50 }),
  lastName: t.String({ minLength: 3, maxLength: 50 }),
});

export const ClientsListResponseDto = t.Array(ClientResponseDto);
