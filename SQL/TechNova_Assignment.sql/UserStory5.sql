#Task1
START TRANSACTION;
INSERT INTO Employee VALUES
(6,'Jaya','F','1994-08-10','2024-01-15',101);
INSERT INTO Performance VALUES
(6,201,4,'2024-01-20');
COMMIT;
#Task2
EXPLAIN SELECT e.Emp_Name, d.Dept_Name, p.Rating FROM Employee e JOIN Department d ON e.Dept_ID = d.Dept_ID JOIN Performance p ON e.Emp_ID = p.Emp_ID;
#Task3
EXPLAIN
SELECT e.Emp_Name, d.Dept_Name, p.Rating FROM Employee e JOIN Department d ON e.Dept_ID = d.Dept_ID JOIN Performance p ON e.Emp_ID = p.Emp_ID;
