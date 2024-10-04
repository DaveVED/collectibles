import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import healthRoutes from "./routes/healthRoutes";
import cardsRoutes from "./routes/cardsRoutes";
import { log } from "@collectibles/logger";

export const createServer = (): Express => {
  log("setting up app, enhance logger later.");
  const app = express();
  app
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(healthRoutes)
    .use(cardsRoutes);

  return app;
};
