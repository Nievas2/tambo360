import express from "express";
import { registrarEstablecimiento, listarEstablecimientos } from "../controllers/establishmentController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post('/crear-establecimiento', authenticate, registrarEstablecimiento);
router.get('/obtener-establecimiento', authenticate, listarEstablecimientos);

export default router;