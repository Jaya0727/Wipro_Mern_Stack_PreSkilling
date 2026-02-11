const { expect } = require("chai");
const calculator = require("../calculator");

describe("Calculator Tests", () => {

  it("add two numbers", () => {
    expect(calculator.add(2, 3)).to.equal(5);
  });

  it("subtract two numbers", () => {
    expect(calculator.subtract(5, 3)).to.equal(2);
  });

  it("multiply two numbers", () => {
    expect(calculator.multiply(4, 3)).to.equal(12);
  });

  it("divide two numbers", () => {
    expect(calculator.divide(10, 2)).to.equal(5);
  });

  it("throw error when dividing by zero", () => {
    expect(() => calculator.divide(10, 0)).to.throw("Cannot divide by zero");
  });

});
