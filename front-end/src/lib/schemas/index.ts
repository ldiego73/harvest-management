import { z } from "zod";

export const harvestSchema = z.object({
  growerId: z.string().uuid(),
  farmId: z.string().uuid(),
  clientId: z.string().uuid(),
  commodityId: z.string().uuid(),
  varietyId: z.string().uuid(),
  quantity: z.number().positive().int(),
  confirmCreation: z.boolean().refine((value) => value === true, {
    message: "You must confirm the creation",
  }),
});

export type HarvestFormData = z.infer<typeof harvestSchema>;
