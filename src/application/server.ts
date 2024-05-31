import express, { Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import cors from "cors";
import { toursDocs, limiter } from "../config";
import { errorMiddleware } from "../middlewares";
import { router } from "../routers";

export const app = express();

app.use(cors());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(toursDocs));
app.use(limiter);
app.use(express.json());
app.use(router);
app.use(errorMiddleware);
app.all("*", (req: Request, res: Response) => {
  return res.status(404).json({ error: `cannot get ${req.path}` });
});
