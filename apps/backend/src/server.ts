import express from "express";
import {setupMiddleware} from "./middleware";
import apiRoutes from "./routes";
import config from "./config";

const app = express();

setupMiddleware(app);

app.use("/api", apiRoutes);

app.listen(config.port, () => {
  console.log(`Example Auth Backend running on port ${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
