import express, { Express } from "express";
import dotenv from "dotenv";

import router from "./routes";

dotenv.config();

const { PORT = 4040 } = process.env;

export default async function startServer(): Promise<void> {
  const app: Express = express();

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  });

  app.use(router);

  app.listen(PORT, () => console.log(`Example app listening on port ${PORT}`));
}
