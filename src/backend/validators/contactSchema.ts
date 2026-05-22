import { z } from "zod";

export const backendContactSchema = z.object({
  name: z.string().min(2).trim(),
  email: z.string().email().toLowerCase().trim(),
  budget: z.string().min(1),
  message: z.string().min(10).trim(),
});

export type BackendContactInput = z.infer<typeof backendContactSchema>;