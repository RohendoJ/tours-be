import { NextFunction, Request, Response } from "express";
import { logger } from "../config";

export class HTTPExecption extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message, { service: "error middleware" });

  if (err instanceof HTTPExecption) {
    return res.status(err.status).json({ error: err.message }).end();
  } else {
    return res.status(500).json({ error: "Internal server error" }).end();
  }
};
