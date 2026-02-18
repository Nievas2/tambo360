import { Request, Response } from "express";
import userService from "../services/userService";

export const registrarUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, correo, contraseña } = req.body;

    if (!nombre || !correo || !contraseña) {
      res.status(400).json({
        error: "Todos los campos son obligatorios",
      });
      return;
    }

    const nuevoUsuario = await userService.create({ nombre, correo, contraseña });

    res.status(201).json({
      usuario: nuevoUsuario.toJSON(),
      mensaje: "Usuario registrado correctamente",
    });

  } catch (error: unknown) {
    if (error instanceof Error && error.message === "User already exists") {
      res.status(409).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

export const iniciarSesion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
      res.status(400).json({
        error: "Correo y contraseña son obligatorios",
      });
      return;
    }

    const usuario = await userService.authenticate(correo, contraseña);

    res.json({
      usuario: usuario.toJSON(),
      token: "mock-jwt-token-" + usuario.id,
      mensaje: "Inicio de sesión exitoso",
    });

  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message === "Invalid email or password"
    ) {
      res.status(401).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
