import { prisma } from "../application";
import { logger } from "../config";
import { HTTPExecption } from "../middlewares";

export const getProfile = async (userId: string) => {
  logger.info("Get profile", { service: "user-service" });

  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      fullname: true,
      created_at: true,
      updated_at: true,
    },
  });

  if (!user) {
    throw new HTTPExecption(404, "User not found");
  }

  return user;
};
