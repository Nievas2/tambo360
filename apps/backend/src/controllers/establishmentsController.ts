import { Request, Response } from "express";
import servicioEstablecimientos from "../services/establishmentsService";

export const registrarEstablecimiento = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, fechaCreacion, localidad, provincia } = req.body;

        if (!nombre || !fechaCreacion || !localidad || !provincia) {
            res.status(400).json({
                error: "Todos los campos son obligatorios",
            });
            return;
        }

        const nuevo = await servicioEstablecimientos.crear({ nombre, fechaCreacion, localidad, provincia });
        res.status(201).json({
            message: "Establecimiento registrado correctamente",
            establecimiento: nuevo,
        });

    } catch (error: unknown) {
        res.status(500).json({ error: "Error al registrar el establecimiento" });
    }
};

export const listarEstablecimientos = async (_req: Request, res: Response): Promise<void> => {
    try {
        const lista = servicioEstablecimientos.obtenerTodos();

        res.json({
            establecimientos: lista,
        });

    } catch (error) {
        res.status(500).json({
            error: "Error al obtener los establecimientos",
        });
    }
};
