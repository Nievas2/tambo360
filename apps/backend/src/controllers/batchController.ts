import { Request, Response } from "express";
import ServicioLotes from "../services/batchService";

//Registrar un nuevo lote
export const registrarLote = async (req: Request, res: Response): Promise<void> => {
    try {
        const { fechaProduccion, tipoProduccion, cantidad, unidad } = req.body;

        if (!fechaProduccion || !tipoProduccion || !cantidad || !unidad) {
            res.status(400).json({
                error: "Todos los campos son obligatorios",
            });
            return;
        }

        const nuevoLote = await ServicioLotes.crear({
            fechaProduccion,
            tipoProduccion,
            cantidad,
            unidad,
        });

        res.status(201).json({
            message: "Lote registrado correctamente",
            lote: nuevoLote,
        });

    } catch (error: unknown) {
        if (error instanceof Error && error.message === "El lote ya existe") {
            res.status(409).json({ error: error.message });
            return;
        }

        res.status(500).json({ error: "Error al registrar el lote" });
    }
};


// Actualizar un lote existente
export const actualizarLote = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const { fechaProduccion, tipoProduccion, cantidad, unidad } = req.body;

        if (!fechaProduccion || !tipoProduccion || !cantidad || !unidad) {
            res.status(400).json({
                error: "Todos los campos son obligatorios",
            });
            return;
        }

        const loteActualizado = await ServicioLotes.editar({
            id,
            fechaProduccion,
            tipoProduccion,
            cantidad,
            unidad,
        });

        res.json({
            message: "Lote actualizado correctamente",
            lote: loteActualizado,
        });

    } catch (error: unknown) {
        if (error instanceof Error && error.message === "Lote no encontrado") {
            res.status(404).json({ error: error.message });
            return;
        }

        res.status(500).json({ error: "Error al actualizar el lote" });
    }
};

//Listar todos los lotes
export const listarLotes = (req: Request, res: Response): void => {
    const lotes = ServicioLotes.obtenerTodos();
    res.json({ lotes });
};

// Obtener un lote por ID
export const obtenerLote = (req: Request, res: Response): void => {
    const id = Number(req.params.id);

    const lote = ServicioLotes.obtenerPorId(id);

    if (!lote) {
        res.status(404).json({ error: "Lote no encontrado" });
        return;
    }

    res.json({ lote });
};
