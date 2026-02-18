import express from "express";
import {register, login} from "../controllers/authController";
import { prisma } from "../lib/prisma";


const router = express.Router();

router.post('/register', register);
router.get('/test', async (req, res) => {
    const usuarios = await prisma.usuario.findMany();
    console.log(usuarios);
    res.json(usuarios);
});
router.post('/login', login);

export default router;
