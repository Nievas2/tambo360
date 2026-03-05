import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { ApiResponse } from "../utils/ApiResponse";
import { TamboEngineService } from "../services/tamboEngineService";

export class AlertController {
    static async getAlertas(req: Request, res: Response, next: NextFunction) {
        try {
            const { idEstablecimiento } = req.params;
            if (!idEstablecimiento) throw new AppError("ID del establecimiento requerido", 400);

            const alertas = await TamboEngineService.getAlertas(idEstablecimiento);
            return res.status(200).json(ApiResponse.success(alertas, "Alertas obtenidas correctamente"));
        } catch (error) {
            next(error);
        }
    }

    static async getUltimasAlertas(req: Request, res: Response, next: NextFunction) {
        try {
            const { idEstablecimiento } = req.params;
            if (!idEstablecimiento) throw new AppError("ID del establecimiento requerido", 400);

            const alertas = await TamboEngineService.getUltimasAlertas(idEstablecimiento);
            return res.status(200).json(ApiResponse.success(alertas, "Últimas alertas obtenidas correctamente"));
        } catch (error) {
            next(error);
        }
    }
}
