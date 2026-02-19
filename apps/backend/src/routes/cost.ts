import { Router } from "express";
import { crearCosto, obtenerCostoPorId, obtenerCostosPorLote, actualizarCosto, eliminarCosto } from "../controllers/costController";

const router = Router();

router.post("/", crearCosto);
router.get("/lote/:loteId", obtenerCostosPorLote);
router.get("/:id", obtenerCostoPorId);
router.put("/:id", actualizarCosto);
router.delete("/:id", eliminarCosto);

export default router;
