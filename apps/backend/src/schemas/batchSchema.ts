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

    fechaProduccion: z.string()
        .min(1, "La fecha de producción es obligatoria")
        .refine((val) => {
            const regex = /^\d{2}\/\d{2}\/\d{4}$/;
            return regex.test(val);
        }, { message: "Formato de fecha inválido, debe ser dd/mm/aaaa" })
        .transform((val) => {
            const [dd, mm, yyyy] = val.split("/");
            return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
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
});

export type CrearLoteDTO = z.infer<typeof crearLoteSchema>;