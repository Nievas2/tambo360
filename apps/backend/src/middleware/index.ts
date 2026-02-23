import cors from "cors";
import bodyParser from "body-parser";
import { Application, NextFunction, Request, Response } from "express";

export const setupMiddleware = (app: Application): void => {
  app.use(cors(
    {
      origin: "http://localhost:5173",
      credentials: true
    }
  ));
  app.use(bodyParser.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
};

