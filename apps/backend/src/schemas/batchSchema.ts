import { z } from "zod";

export const crearLoteSchema = z.object({
    idProducto: z
        .string()
        .min(1, "Debe seleccionar un producto válido"),

    cantidad: z.preprocess((val) => {
        if (val === "" || val === null || val === undefined) return undefined;
        const parsed = Number(val);
        return isNaN(parsed) ? undefined : parsed;
    },
        z.number()
            .refine((v) => v !== undefined, {
                message: "La cantidad es obligatoria",
            })
            .positive("La cantidad debe ser mayor a 0")
    ),

    unidad: z.enum(["kg", "litros"], {
        message: "Unidad inválida",
    }),

    fechaProduccion: z
        .string()
        .min(1, "La fecha de producción es obligatoria")
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Fecha inválida",
        }),

    merma: z.preprocess((val) => {
        if (val === "" || val === null || val === undefined) return undefined;
        const parsed = Number(val);
        return isNaN(parsed) ? undefined : parsed;
    },
        z.number()
            .positive("La merma debe ser mayor a 0")
            .optional()
    ),

    observaciones: z
        .string()
        .max(255, "Observaciones demasiado largas")
        .optional()
        .refine(
            (val) => val === undefined || val.trim() !== "",
            "Observaciones no puede estar vacía"
        ),
});

export type CrearLoteDTO = z.infer<typeof crearLoteSchema>;