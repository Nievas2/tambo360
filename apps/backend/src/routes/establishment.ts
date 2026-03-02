import express from "express";
import { registrarEstablecimiento, listarEstablecimientos } from "../controllers/establishmentController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post('/registrar', authenticate, registrarEstablecimiento);
router.get('/listar', authenticate, listarEstablecimientos);

export default router;