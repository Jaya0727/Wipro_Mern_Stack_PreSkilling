// salary.test.js

const { expect } = require("chai");
const {
  calculateSalary,
  calculateBonus,
  calculateLeaveDeduction
} = require("./salary");

describe("Salary Calculation Tests", () => {

  it("should calculate bonus correctly", () => {
    const bonus = calculateBonus(10000);
    expect(bonus).to.equal(1000);
  });

  it("should calculate leave deduction correctly", () => {
    const deduction = calculateLeaveDeduction(2);
    expect(deduction).to.equal(1000);
  });

  it("should calculate final salary correctly", () => {
    const salary = calculateSalary(10000, 1000, 2);
    expect(salary).to.equal(10000);
  });

});
