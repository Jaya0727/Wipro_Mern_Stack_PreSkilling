
const { expect } = require("chai");
const { add, subtract, multiply } = require("./calculator"); 

describe("Calculator Unit Tests", () => {

  it("add two numbers", () => {
    expect(add(10, 5)).to.equal(15);
  });

  it("subtract two numbers", () => {
    expect(subtract(10, 5)).to.equal(5);
  });

  it("multiply two numbers", () => {
    expect(multiply(10, 5)).to.equal(50);
  });

});
