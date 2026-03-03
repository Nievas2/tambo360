import { Router } from "express"
import {createMerma, getMermas, getMermaById, updateMerma, deleteMerma } from "../controllers/mermaController"

const router = Router()

router.post("/", createMerma)
router.get("/", getMermas)
router.get("/:id", getMermaById)
router.put("/:id", updateMerma)
router.delete("/:id", deleteMerma)

export default router