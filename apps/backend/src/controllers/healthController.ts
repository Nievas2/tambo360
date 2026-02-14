import { Request, Response } from "express";

export const check = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json({
      status: "ok",
      timestamp: new Date(),
      uptime: process.uptime(),
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      timestamp: new Date(),
      error: "Health check failed",
    });
  }
};
