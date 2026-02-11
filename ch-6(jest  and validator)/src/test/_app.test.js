import supertest from "supertest";
import app from "../app.js";

describe("GET /", () => {
  it("should return 200", async () => {
    const res = await supertest(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Hello World");
  });
});
