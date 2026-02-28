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


    fechaProduccion: z
        .string()
        .min(1, "La fecha de producción es obligatoria")
        .refine((val) => /^\d{2}\/\d{2}\/\d{4}$/.test(val), {
            message: "Formato de fecha inválido, debe ser dd/mm/aaaa",
        })
        .transform((val) => {
            const now = new Date();
            const [dd, mm, yyyy] = val.split("/");
            const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));

            const fechaMinima = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
            const fechaMaxima = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            if (date < fechaMinima || date > fechaMaxima) {
                throw new Error("La fecha de producción debe estar entre hoy y 7 días antes");
            }

            return date;
        }),

    estado: z.boolean().optional()
});

export type CrearLoteDTO = z.infer<typeof crearLoteSchema>;