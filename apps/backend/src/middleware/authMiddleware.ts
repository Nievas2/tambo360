import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

interface JwtPayload {
  user: {
    idUsuario: string;
  };
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new AppError("No autenticado", 401);
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    
    req.user = { id: decoded.user.idUsuario }; //Se setea  el id del usuario

    next();
  } catch (error) {
    next(new AppError("Token inválido o expirado", 401));
  }
};