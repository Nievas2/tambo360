import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import { AppError } from "../utils/AppError";
import { ApiResponse } from "../utils/ApiResponse";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { nombre, correo, contraseña } = req.body;

    if (!nombre || !correo || !contraseña) {
      throw new AppError("Todos los campos son obligatorios", 400);
    }

    const newUser = await userService.create({
      nombre,
      correo,
      contraseña,
    });

    const response = ApiResponse.success(
      newUser.toJSON(),
      "Usuario registrado exitosamente",
      201
    );

    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
      throw new AppError("Email y contraseña son obligatorios", 400);
    }

    const user = await userService.authenticate(correo, contraseña);

    const data = {
      user: user.toJSON(),
      token: "mock-jwt-token-" + user.id,
    };

    const response = ApiResponse.success(data, "Inicio de sesión exitoso");
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
};
