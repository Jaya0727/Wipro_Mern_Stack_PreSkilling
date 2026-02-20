const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;
const app = require("../server");

//menu
describe("Menu API Testing", () => {
  it("Should get all menu items", async () => {
    const res = await request(app)
      .get("/api/menu");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");

  });

});