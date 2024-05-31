import supertest from "supertest";
import { app, prisma } from "../../src/application";

describe("POST /api/v1/auth/register", () => {
  afterAll(async () => {
    await prisma.users.delete({
      where: {
        username: "username1",
      },
    });
  });

  it("should error validation", async () => {
    const response = await supertest(app).post("/api/v1/auth/register").send({
      fullname: "",
      userame: "",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body?.error).toBeDefined();
  });

  it("should success registration", async () => {
    const response = await supertest(app).post("/api/v1/auth/register").send({
      fullname: "user",
      username: "username1",
      password: "test123123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body?.message).toBeDefined();
  });

  it("should user already exists", async () => {
    const response = await supertest(app).post("/api/v1/auth/register").send({
      fullname: "user",
      username: "username1",
      password: "test123123",
    });

    expect(response.status).toBe(409);
    expect(response.body).toHaveProperty("error");
    expect(response.body?.error).toBeDefined();
  });
});
