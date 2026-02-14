import express from "express";
import AuthRoutes from "./auth";
import HealthRoutes from "./health";

const router = express.Router();

router.use('/auth', AuthRoutes);
router.use('/health', HealthRoutes);

export default router;
