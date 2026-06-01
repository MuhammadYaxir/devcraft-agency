import { z } from "zod";

export const backendContactSchema = z.object({
  name: z.string().min(2, "Name is required").trim(),

  email: z.string().email("Valid email is required").toLowerCase().trim(),

  company: z.string().trim().optional().or(z.literal("")),

  projectType: z.string().trim().optional().or(z.literal("")),

  budget: z.string().trim().optional().or(z.literal("")),

  message: z.string().min(10, "Message must be at least 10 characters").trim(),
});

export type BackendContactInput = z.infer<typeof backendContactSchema>;