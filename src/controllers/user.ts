import { NextFunction, Request, Response } from "express";
import { User } from "../config";
import { getProfile } from "../services";

export const userController = {
  getProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getProfile((req as User).user.id);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
