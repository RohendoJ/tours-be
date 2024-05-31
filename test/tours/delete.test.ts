import supertest from "supertest";
import argon2 from "argon2";
import { app, prisma } from "../../src/application";

describe("DELETE /api/v1/tours/:id", () => {
  let token: string;
  let id: string;

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

    const tour = await supertest(app)
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

    id = tour.body.tour.id;
  });

  afterAll(async () => {
    await prisma.users.delete({
      where: {
        username: "username1",
      },
    });
  });

  it("should failed delete tour by id", async () => {
    const response = await supertest(app)
      .get("/api/v1/tours/salah")
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body?.error).toBeDefined();
  });

  it("should success delete tour by id", async () => {
    const response = await supertest(app)
      .delete(`/api/v1/tours/${id}`)
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
