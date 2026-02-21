import swaggerJsdoc from "swagger-jsdoc"; 
import swaggerUi from "swagger-ui-express"; 
import { Express } from "express";

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Tambo360 API",
        version: "1.0.0",
        description: "Documentación de la API del proyecto Tambo360",
      },
      servers: [
        {
          url: "http://localhost:3000", // Cambiar al deploy final
        },
      ],
    },
    apis: ["./src/docs/*.ts"], 
  };

  const specs = swaggerJsdoc(options);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
