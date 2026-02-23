import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma";
import { AppError } from "../utils/AppError";


export const establecimientoUsuario = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return next(new AppError("Usuario no autenticado", 401));
    }

    const establecimientos = await prisma.establecimiento.findMany({
      where: { idUsuario: userId }
    });

    if (establecimientos.length === 0) {
      return next(
        new AppError("El usuario no tiene establecimiento registrado", 403)
      );
    }

    if (establecimientos.length > 1) {
      return next(
        new AppError(
          "El usuario tiene más de un establecimiento. Contacte al administrador.",
          400
        )
      );
    }

    
    req.establecimiento = establecimientos[0]; //Se adjunta el establecimiento al request

    next();
  } catch (error) {
    next(error);
  }
};