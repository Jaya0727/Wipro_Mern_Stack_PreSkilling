const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../server");

describe("Auth API Testing", () => {
  //Register
  it("Should register user", async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Test User",
      email: "testuser8@gmail.com",
      password: "123456",
      role:"user"
    });

  console.log(res.body);

  expect(res.status).to.equal(200);
  expect(res.body).to.have.property("message","Registered successfully");
});

  //Login
  it("Should login user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@gmail.com",
        password: "123456"
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
  });

});