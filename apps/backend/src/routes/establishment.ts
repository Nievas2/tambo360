import express from "express";
import { registrarEstablecimiento, listarEstablecimientos } from "../controllers/establishmentController";

const router = express.Router();

router.post('/crear-establecimiento', registrarEstablecimiento);
router.get('/obtener-establecimiento', listarEstablecimientos);

export default router;