import supertest from "supertest";
import argon2 from "argon2";
import { app, prisma } from "../../src/application";

describe("POST /api/v1/auth/login", () => {
  beforeAll(async () => {
    await prisma.users.create({
      data: {
        username: "username1",
        password: await argon2.hash("test123123"),
        fullname: "user",
      },
    });
  });

  afterAll(async () => {
    await prisma.users.delete({
      where: {
        username: "username1",
      },
    });
  });

  it("should error validation", async () => {
    const response = await supertest(app).post("/api/v1/auth/login").send({
      username: "",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body?.error).toBeDefined();
  });

  it("should invalid user", async () => {
    const response = await supertest(app).post("/api/v1/auth/login").send({
      username: "username",
      password: "test123123",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body?.error).toBeDefined();
  });

  it("should success login", async () => {
    const response = await supertest(app).post("/api/v1/auth/login").send({
      username: "username1",
      password: "test123123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("access_token");
    expect(response.body?.message).toBeDefined();
    expect(response.body?.access_token).toBeDefined();
  });
});
