import supertest from "supertest";
import argon2 from "argon2";
import { app, prisma } from "../../src/application";

describe("GET /api/v1/tours", () => {
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

    await supertest(app)
      .post("/api/v1/tours")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: "test",
        province: "test",
        province_id: "test",
        regency: "test",
        regency_id: "test",
        latitude: "test",
        longtitude: "test",
      });
  });

  afterAll(async () => {
    await prisma.users.delete({
      where: {
        username: "username1",
      },
    });
  });

  it("should failed get tour", async () => {
    const response = await supertest(app).get("/api/v1/tours").set({
      Authorization: `Bearer `,
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
    expect(response.body?.error).toBeDefined();
  });

  it("should success get tour", async () => {
    const response = await supertest(app)
      .get("/api/v1/tours")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
