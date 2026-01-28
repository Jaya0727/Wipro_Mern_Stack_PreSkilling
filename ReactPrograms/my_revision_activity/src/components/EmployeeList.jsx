import { useState } from "react";
import Employee from "./Employee";

function EmployeeList() {
  const [promotedEmployee, setPromotedEmployee] = useState("");

  const employees = [
    { name: "Jaya", currentRole: "Developer" },
    { name: "Jashu", currentRole: "Tester" },
    { name: "Abhi", currentRole: "Designer" }
  ];

  const handlePromotion = (employeeName) => {
    setPromotedEmployee(employeeName);
  };

  return (
    <div className="w-96 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Employee List</h2>

      {employees.map((emp, index) => (
        <Employee
          key={index}
          name={emp.name}
          currentRole={emp.currentRole}
          onPromote={handlePromotion}
        />
      ))}

      {promotedEmployee && (
        <p className="mt-4 text-green-600 font-semibold">
          {promotedEmployee} has been promoted!
        </p>
      )}
    </div>
  );
}

export default EmployeeList;