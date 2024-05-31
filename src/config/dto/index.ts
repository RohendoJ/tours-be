import { z } from "zod";
import {
  registerSchema,
  loginSchema,
  createTourSchema,
  updateTourSchema,
} from "../validation";

export type registerDto = z.infer<typeof registerSchema>;
export type loginDto = z.infer<typeof loginSchema>;
export type createTourDto = z.infer<typeof createTourSchema>;
export type updateTourDto = z.infer<typeof updateTourSchema>;
