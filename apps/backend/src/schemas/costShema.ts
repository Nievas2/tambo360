import { z } from "zod";

export const crearCostoSchema = z.object({
    loteId: z.string().uuid("loteId inválido"),
    concepto: z
        .string()
        .trim()
        .min(2, "El concepto debe tener al menos 2 caracteres")
        .max(255, "Concepto demasiado largo")
        .refine((val) => /[a-zA-ZÁÉÍÓÚáéíóúÑñ]/.test(val), {
            message: "El concepto debe contener al menos una letra",
        }),

    monto: z.coerce
        .number()
        .positive("El monto debe ser mayor a cero")
        .transform((val) => Number(val.toFixed(2))),

    observaciones: z
        .string()
        .max(500, "Observaciones demasiado largas")
        .optional()
        .refine((val) => !val || val.trim().length > 0, {
            message: "Observaciones no puede contener solo espacios",
        }),
});

export const actualizarCostoSchema = z.object({
    concepto: z.string().min(1).max(255).optional(),
    monto: z.number().positive().optional(),
    observaciones: z.string().max(500).optional(),
});

export const idParamSchema = z.object({
    id: z.string().uuid("ID inválido"),
});

export const loteParamSchema = z.object({
    loteId: z.string().uuid("loteId inválido"),
});


export type CrearCostoDTO = z.infer<typeof crearCostoSchema>;
export type ActualizarCostoDTO = z.infer<typeof actualizarCostoSchema>;