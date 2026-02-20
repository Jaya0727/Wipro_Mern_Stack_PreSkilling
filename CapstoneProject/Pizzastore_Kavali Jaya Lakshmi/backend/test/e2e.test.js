const request = require("supertest");
const app = require("../server");
const chai = require("chai");
const expect = chai.expect;

let token = "";
let orderId = "";

describe("End-to-End Pizza Flow", () => {

  //Login
  it("User Login", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "hanu@gmail.com",
        password: "123456",
      });

    expect(res.status).to.equal(200);
    token = res.body.token;
  });

  //Fetch menu
  it("Fetch Menu", async () => {
    const res = await request(app)
      .get("/api/menu");

    expect(res.status).to.equal(200);
  });

  //Place order
  it("Place Order", async () => {
    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        items: [
          {
            name: "Veg Pizza",
            price: 199,
            qty: 1,
          },
        ],
        totalAmount: 199,
        paymentMethod: "COD",
        deliveryMode: "Home Delivery",
        address:{
            fullName:"Hanu",
            phone:"9999999999",
            addressLine:"PRT Street",
            city:"Dharmavaram",
            pincode:"515671"
        }
      }); console.log(res.body);

    expect(res.status).to.equal(201);
    orderId = res.body._id;
  });

  //Fetch orders
  it("Get My Orders", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).to.equal(200);
  });

});