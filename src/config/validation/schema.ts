import { z } from "zod";

export const registerSchema = z.object({
  fullname: z
    .string({ required_error: "fullname is required" })
    .min(1, "fullname is required")
    .max(100, "fullname is too long"),
  username: z
    .string({ required_error: "username is required" })
    .min(6, "username is required")
    .max(100, "username is too long"),
  password: z
    .string({ required_error: "password is required" })
    .min(1, "password is required")
    .max(100, "password is too long"),
});

export const loginSchema = z.object({
  username: z
    .string({ required_error: "username is required" })
    .min(1, "username is required")
    .max(100, "username is too long"),
  password: z
    .string({ required_error: "password is required" })
    .min(1, "password is required")
    .max(100, "password is too long"),
});

export const createTourSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .min(1, "name is required")
    .max(100, "name is too long"),
  province: z
    .string({ required_error: "province is required" })
    .min(1, "province is required")
    .max(100, "province is too long"),
  province_id: z
    .string({ required_error: "province_id is required" })
    .min(1, "province_id is required")
    .max(100, "province_id is too long"),
  regency: z
    .string({ required_error: "regency is required" })
    .min(1, "regency is required")
    .max(100, "regency is too long"),
  regency_id: z
    .string({ required_error: "regency_id is required" })
    .min(1, { message: "regency_id is required" })
    .max(100, { message: "regency_id is too long" }),
  latitude: z
    .string({ required_error: "latitude is required" })
    .min(1, { message: "latitude is required" })
    .max(100, "latitude is too long"),
  longtitude: z
    .string({
      required_error: "longitude is required",
    })
    .min(1, "longitude is required")
    .max(100, "longitude is too long"),
  image: z.any({ required_error: "image is required" }).optional(),
});

export const updateTourSchema = z.object({
  name: z
    .string({ required_error: "name is required" })
    .min(1, "name is required")
    .max(100, "name is too long"),
  province: z
    .string({ required_error: "province is required" })
    .min(1, "province is required")
    .max(100, "province is too long"),
  province_id: z
    .string({ required_error: "province_id is required" })
    .min(1, {
      message: "province_id is required",
    })
    .max(100, { message: "province_id is too long" }),
  regency: z
    .string({ required_error: "regency is required" })
    .min(1, "regency is required")
    .max(100, "regency is too long"),
  regency_id: z
    .string({ required_error: "regency_id is required" })
    .min(1, { message: "regency_id is required" })
    .max(100, { message: "regency_id is too long" }),
  latitude: z
    .string({ required_error: "latitude is required" })
    .min(1, { message: "latitude is required" })
    .max(100, "latitude is too long"),
  longtitude: z
    .string({
      required_error: "longitude is required",
    })
    .min(1, "longitude is required")
    .max(100, "longitude is too long"),
  image: z.any({ required_error: "image is required" }).optional(),
});
