const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../server");

describe("Order API Testing", () => {
  let token = "";
  //login First - get token and then placing order
  before(async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "hanu@gmail.com",
        password: "123456",
      });

    token = res.body.token;
  });

  it("Should place order", async () => {
    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        totalAmount: 199,
        paymentMethod: "COD",
        deliveryMode: "Home Delivery",
        address: {
          fullName: "Hanu",
          phone: "9999999999",
          addressLine: "PRT Street",
          city: "Dharmavaram",
          pincode: "515671",
        },
      });

    expect(res.status).to.equal(201);

  });

});