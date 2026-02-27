import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { crearLote, editarLote, listarLotes, obtenerLote, eliminarLote, produccionDelDia } from "../controllers/batchController";

const router = express.Router();

router.post('/registrar', authenticate, crearLote);
router.put('/actualizar/:idLote', authenticate, editarLote);
router.get("/listar", authenticate, listarLotes);
router.get("/:idLote", authenticate, obtenerLote);
router.delete("/eliminar/:idLote", authenticate, eliminarLote);
router.get("/produccion-hoy", authenticate, produccionDelDia);

export default router;