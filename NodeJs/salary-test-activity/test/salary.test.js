const { expect } = require("chai");
const salary = require("../salary");

describe("Salary Calculation", () => {

  it("calculate gross salary", () => {
    expect(salary.calculateGrossSalary(20000, 3000)).to.equal(23000);
  });

  it("calculate bonus for performance A", () => {
    expect(salary.calculateBonus(30000,"A")).to.equal(6000);
  });

  it("calculate leave deduction", () => {
    expect(salary.calculateLeaveDeduction(30000,2)).to.equal(2000);
  });

  it("calculate net salary correctly", () => {
    const netSalary = salary.calculateNetSalary(
      30000,
      4000,
      2000,
      "A",
      2
    );
    expect(netSalary).to.equal(32600);
  });

});
