import express from "express";
import { registrarLote, actualizarLote, listarLotes, obtenerLote } from "../controllers/batchController";

const router = express.Router();

router.post('/registrar', registrarLote);
router.put('/actualizar/:id', actualizarLote);
router.get("/listar", listarLotes);
router.get("/:id", obtenerLote);

export default router;