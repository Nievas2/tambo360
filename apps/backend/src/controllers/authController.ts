import { Request, Response, NextFunction } from "express";
import userService from "../services/userService";
import { AppError } from "../utils/AppError";
import { ApiResponse } from "../utils/ApiResponse";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new AppError("Todos los campos son obligatorios", 400);
    }

    const newUser = await userService.create({ name, email, password });

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
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email y contraseña son obligatorios", 400);
    }

    const user = await userService.authenticate(email, password);

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
