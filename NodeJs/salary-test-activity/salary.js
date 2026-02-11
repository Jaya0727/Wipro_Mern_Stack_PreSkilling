function calculateGrossSalary(basic, allowance) {
  return basic + allowance;
}

function calculateTax(grossSalary) {
  if (grossSalary <= 25000) return 0;
  if (grossSalary <= 50000) return grossSalary * 0.1;
  return grossSalary * 0.2;
}

function calculateBonus(basic, performanceRating) {
  if (performanceRating === "A") return basic * 0.2;
  if (performanceRating === "B") return basic * 0.1;
  return 0;
}

function calculateLeaveDeduction(basic, leaveDays) {
  const perDaySalary = basic / 30;
  return leaveDays * perDaySalary;
}

function calculateNetSalary(
  basic,
  allowance,
  pf,
  performanceRating,
  leaveDays
) {
  const grossSalary = calculateGrossSalary(basic, allowance);
  const tax = calculateTax(grossSalary);
  const bonus = calculateBonus(basic, performanceRating);
  const leaveDeduction = calculateLeaveDeduction(basic, leaveDays);

  return grossSalary + bonus - tax - pf - leaveDeduction;
}

module.exports = {
  calculateGrossSalary,
  calculateTax,
  calculateBonus,
  calculateLeaveDeduction,
  calculateNetSalary
};
