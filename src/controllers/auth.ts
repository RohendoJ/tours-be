import { NextFunction, Request, Response } from "express";
import { register, login } from "../services";

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await register(req.body);

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await login(req.body);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
