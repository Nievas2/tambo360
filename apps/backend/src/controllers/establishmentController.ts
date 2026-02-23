import { Request, Response, NextFunction } from "express";
import establishmentsService from "../services/establishmentService";
import { createEstablishmentSchema } from "../schemas/establishmentSchema";
import { ApiResponse } from "../utils/ApiResponse";
import { AppError } from "../utils/AppError";

export const registrarEstablecimiento = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const parsed = createEstablishmentSchema.safeParse(req.body);

        if (!parsed.success) {
            const errors = parsed.error.issues.map(i => i.message).join(", ");
            throw new AppError(errors, 400);
        }

        const idUsuario = (req as any).user.idUsuario;
        const nuevoEstablecimiento = await establishmentsService.crear({ ...parsed.data, userId: idUsuario, });

        const response = ApiResponse.success(
            nuevoEstablecimiento,
            "Establecimiento creado correctamente",
            201
        );

        res.status(response.statusCode).json(response);

    } catch (error) {
        next(error);
    }
};

export const listarEstablecimientos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const idUsuario = (req as any).user.idUsuario;

        const establecimientos = await establishmentsService.listarPorUsuario(idUsuario);

        const response = ApiResponse.success(
            establecimientos,
            "Establecimientos obtenidos correctamente",
            200
        );

        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
};