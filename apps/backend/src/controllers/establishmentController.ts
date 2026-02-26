import { Request, Response, NextFunction } from "express";
import establishmentsService from "../services/establishmentsService";
import { createEstablishmentSchema } from "../schemas/establishmentSchema";
import { ApiResponse } from "../utils/ApiResponse";
import { AppError } from "../utils/AppError";

export const registrarEstablecimiento = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const parsed = createEstablishmentSchema.safeParse(req.body);

        if (!parsed.success) {
            throw new AppError("Todos los campos son obligatorios y deben ser válidos", 400);
        }

        const user = (req as any).user;

        if (!user) {
            throw new AppError("Usuario no autenticado", 401);
        }

        const nuevoEstablecimiento = await establishmentsService.crear({ ...parsed.data, userId: user.id, });

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
        const idUsuario = (req as any).user.id;

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