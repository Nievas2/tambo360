import express from "express";
import { registrarUsuario, iniciarSesion } from "../controllers/authController";

const router = express.Router();

// Rutas de autenticación
router.post('/register', registrarUsuario);
router.post('/login', iniciarSesion);

export default router;
