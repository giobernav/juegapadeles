import { z } from "zod";

export const todoFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: "Al menos 3 caracteres requeridos" })
    .max(40, { message: "Máximo 40 caracteres" }),
});

export type TodoFormSchemaInputType = z.input<typeof todoFormSchema>;
