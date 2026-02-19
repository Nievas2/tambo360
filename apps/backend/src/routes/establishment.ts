import express from "express";
import { registrarEstablecimiento, listarEstablecimientos } from "../controllers/establishmentsController";

const router = express.Router();

router.post('/registrar', registrarEstablecimiento);
router.get('/listar', listarEstablecimientos);

export default router;