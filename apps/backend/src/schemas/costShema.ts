import { z } from "zod";

export const crearCostoSchema = z.object({
    loteId: z.string().uuid("loteId inválido"),
    concepto: z
        .string()
        .min(1, "Concepto requerido")
        .max(255, "Concepto demasiado largo"),
    monto: z.coerce.number().positive("El monto debe ser mayor a cero"),
    observaciones: z
        .string()
        .max(500, "Observaciones demasiado largas")
        .optional(),
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