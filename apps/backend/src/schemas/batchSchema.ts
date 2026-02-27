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
        .optional()
        .transform((val) => {
            const now = new Date();
            if (!val) {
                return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
            }
            const regex = /^\d{2}\/\d{2}\/\d{4}$/;
            if (!regex.test(val)) throw new Error("Formato de fecha inválido, debe ser dd/mm/aaaa");
            const [dd, mm, yyyy] = val.split("/");
            const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd), now.getHours(), now.getMinutes(), now.getSeconds());

            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const dateToCheck = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            if (dateToCheck.getTime() !== today.getTime()) {
                throw new Error("La fecha de producción debe ser el día de hoy");
            }
            return date;
        }),

    estado: z.boolean().optional()
});

export type CrearLoteDTO = z.infer<typeof crearLoteSchema>;