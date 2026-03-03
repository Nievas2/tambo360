import { Request, Response } from "express"
import { MermaService } from "../services/mermaService"

const service = new MermaService()

export const createMerma = async (req: Request, res: Response) => {
  try {
    const merma = await service.create(req.body)
    res.status(201).json({ success: true, data: merma })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const getMermas = async (_req: Request, res: Response) => {
  const mermas = await service.findAll()
  res.json({ success: true, data: mermas })
}

export const getMermaById = async (req: Request, res: Response) => {
  const merma = await service.findById(req.params.id)

  if (!merma) {
    return res.status(404).json({ success: false, message: "No encontrada" })
  }

  res.json({ success: true, data: merma })
}

export const updateMerma = async (req: Request, res: Response) => {
  try {
    const merma = await service.update(req.params.id, req.body)
    res.json({ success: true, data: merma })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}

export const deleteMerma = async (req: Request, res: Response) => {
  try {
    await service.delete(req.params.id)
    res.json({ success: true, message: "Merma eliminada correctamente" })
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message })
  }
}