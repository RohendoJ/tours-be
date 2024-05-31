import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { prisma } from "../application";
import {
  registerDto,
  logger,
  validate,
  registerSchema,
  loginDto,
  loginSchema,
  ACCESS_TOKEN_SECRET,
} from "../config";
import { HTTPExecption } from "../middlewares";

export const register = async (request: registerDto) => {
  logger.info("Registering new user", { service: "auth-service" });

  request = await validate(registerSchema, request);

  const findUser = await prisma.users.findUnique({
    where: {
      username: request.username,
    },
  });

  if (findUser) {
    throw new HTTPExecption(409, "User already exists");
  }

  request.password = await argon2.hash(request.password);

  const user = await prisma.users.create({
    data: request,
    select: {
      id: true,
      username: true,
      fullname: true,
      created_at: true,
      updated_at: true,
    },
  });

  return {
    message: "User created successfully",
    data: user,
  };
};

export const login = async (request: loginDto) => {
  logger.info("Login user", { service: "auth-service" });

  request = await validate(loginSchema, request);

  const user = await prisma.users.findUnique({
    where: {
      username: request.username,
    },
  });

  if (!user) {
    throw new HTTPExecption(401, "Username or password is incorrect");
  }

  const match = await argon2.verify(user.password, request.password);

  if (!match) {
    throw new HTTPExecption(401, "Username or password is incorrect");
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  return {
    message: "Login successfully",
    access_token: token,
  };
};
