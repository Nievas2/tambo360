import { z } from "zod";


const stringRequiredVisible = (message: string) =>
    z.string().trim().min(2, { message }).refine((val) => /[a-zA-Z0-9]/.test(val), {
        message: "Debe contener al menos una letra o número",
    });

export const createEstablishmentSchema = z.object({
    nombre: stringRequiredVisible("El nombre es obligatorio"),
    localidad: stringRequiredVisible("La localidad es obligatoria"),
    provincia: stringRequiredVisible("La provincia es obligatoria"),
});

export type CreateEstablishmentData = z.infer<typeof createEstablishmentSchema>;