import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { HTTPExecption } from "./error";
import { ACCESS_TOKEN_SECRET, Jwt, User } from "../config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization?.substring(7);

    if (!header) {
      throw new HTTPExecption(401, "Unauthorized");
    }

    jwt.verify(header, ACCESS_TOKEN_SECRET as string, (err, decoded) => {
      if (err) {
        throw new HTTPExecption(401, "Unauthorized");
      }

      (req as User).user = decoded as Jwt;

      next();
    });
  } catch (error) {
    next(error);
  }
};
