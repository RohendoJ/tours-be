import supertest from "supertest";
import argon2 from "argon2";
import { app, prisma } from "../../src/application";

describe("GET /api/v1/users/profile", () => {
  let token: string;

  beforeAll(async () => {
    await prisma.users.create({
      data: {
        username: "username1",
        password: await argon2.hash("test123123"),
        fullname: "user",
      },
    });

    const response = await supertest(app).post("/api/v1/auth/login").send({
      username: "username1",
      password: "test123123",
    });

    token = response.body.access_token;
  });

  afterAll(async () => {
    await prisma.users.delete({
      where: {
        username: "username1",
      },
    });
  });

  it("should unauthorized", async () => {
    const response = await supertest(app).get("/api/v1/users/profile").set({
      Authorization: `Bearer `,
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body?.error).toBeDefined();
  });

  it("should success get profile", async () => {
    const response = await supertest(app)
      .get("/api/v1/users/profile")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
