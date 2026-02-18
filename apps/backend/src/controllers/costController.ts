import { Request, Response } from "express";
import servicioCostos from "../services/costService";

// Crear costo operativo directo
export const crearCosto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { loteId, concepto, monto, moneda, fecha } = req.body;

        if (!loteId || !concepto || !monto || !moneda || !fecha) {
            res.status(400).json({ error: "Todos los campos son obligatorios" });
            return;
        }

        const nuevoCosto = await servicioCostos.crear({
            loteId,
            concepto,
            monto,
            moneda,
            fecha,
        });

        res.status(201).json({
            mensaje: "Costo registrado correctamente",
            costo: nuevoCosto,
        });
    } catch (error: unknown) {
        res.status(500).json({ error: "Error al registrar el costo" });
    }
};

// Obtener costo por ID
export const obtenerCostoPorId = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);

        const costo = servicioCostos.obtenerPorId(id);

        if (!costo) {
            res.status(404).json({ error: "Costo no encontrado" });
            return;
        }

        res.status(200).json(costo);
    } catch (error: unknown) {
        res.status(500).json({ error: "Error al obtener el costo" });
    }
};

// Obtener costos por lote
export const obtenerCostosPorLote = async (req: Request, res: Response): Promise<void> => {
    try {
        const loteId = Number(req.params.loteId);

        const costos = servicioCostos.obtenerPorLote(loteId);

        res.status(200).json(costos);
    } catch (error: unknown) {
        res.status(500).json({ error: "Error al obtener los costos" });
    }
};

// Actualizar costo
export const actualizarCosto = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);
        const datos = req.body;

        const costoActualizado = await servicioCostos.actualizar(id, datos);

        res.status(200).json({
            mensaje: "Costo actualizado correctamente",
            costo: costoActualizado,
        });
    } catch (error: unknown) {
        res.status(404).json({ error: "Costo no encontrado" });
    }
};

// Eliminar costo
export const eliminarCosto = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.id);

        await servicioCostos.eliminar(id);

        res.status(200).json({
            mensaje: "Costo eliminado correctamente",
        });

    } catch (error: unknown) {
        res.status(404).json({ error: "Costo no encontrado" });
    }
};
