import { Request, Response, NextFunction } from "express";
import { LoteService } from "../services/batchService";
import { crearLoteSchema } from "../schemas/batchSchema";
import { AppError } from "../utils/AppError";
import { ApiResponse } from "../utils/ApiResponse";

export const crearLote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = crearLoteSchema.safeParse(req.body);

        if (!parsed.success) {
            const errores = parsed.error.issues.map(e => e.message);
            throw new AppError(errores.join(", "), 400);
        }

        const user = (req as any).user;
        if (!user) throw new AppError("Usuario no autenticado", 401);

        const lote = await LoteService.crearLote(user.id, parsed.data);

        return res.status(201).json(ApiResponse.success(lote, "Lote creado correctamente", 201));
    } catch (error) {
        next(error);
    }
};

export const editarLote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { idLote } = req.params;
        if (!idLote) throw new AppError("Id de lote requerido", 400);

        const parsed = crearLoteSchema.partial().safeParse(req.body);
        if (!parsed.success) {
            const errores = parsed.error.issues.map(e => e.message);
            throw new AppError(errores.join(", "), 400);
        }

        const lote = await LoteService.editarLote(idLote, parsed.data);

        return res.status(200).json(ApiResponse.success(lote, "Lote actualizado correctamente"));
    } catch (error) {
        next(error);
    }
};

export const eliminarLote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        if (!user) throw new AppError("Usuario no autenticado", 401);

        const { idLote } = req.params;
        if (!idLote) throw new AppError("Id de lote requerido", 400);

        await LoteService.eliminarLote(idLote);

        return res.status(200).json(ApiResponse.success(null, "Lote eliminado correctamente", 200));
    } catch (error) {
        next(error);
    }
};

export const listarLotes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        if (!user) throw new AppError("Usuario no autenticado", 401);

        const lotes = await LoteService.listarLotes(user.id);

        return res.status(200).json(ApiResponse.success(lotes, "Lotes listados correctamente"));
    } catch (error) {
        next(error);
    }
};

export const obtenerLote = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = (req as any).user;
        if (!user) throw new AppError("Usuario no autenticado", 401);

        const { idLote } = req.params;
        if (!idLote) throw new AppError("Id de lote requerido", 400);

        const lote = await LoteService.obtenerLote(idLote, user.id);

        return res.status(200).json(ApiResponse.success(lote, "Lote obtenido correctamente"));
    } catch (error) {
        next(error);
    }
};