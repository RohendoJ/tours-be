import { NextFunction, Request, Response } from "express";
import { User } from "../config";
import {
  createTour,
  getTours,
  getTour,
  updateTour,
  deleteTour,
} from "../services";

export const tourController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await createTour((req as User).user.id, {
        ...req.body,
        image: req.file?.buffer,
      });

      return res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.page_size) || 10;

      const result = await getTours((req as User).user.id, page, limit);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await getTour((req as User).user.id, req.params.id);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await updateTour((req as User).user.id, req.params.id, {
        ...req.body,
        image: req.file?.buffer,
      });

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await deleteTour((req as User).user.id, req.params.id);

      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  },
};
