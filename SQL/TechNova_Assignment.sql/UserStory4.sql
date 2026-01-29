#Task -1
SELECT e.Emp_Name, d.Dept_Name, pr.Project_Name, p.Rating FROM Employee e JOIN Department d ON e.Dept_ID = d.Dept_ID JOIN Project pr ON d.Dept_ID = pr.Dept_ID JOIN Performance p ON e.Emp_ID = p.Emp_ID AND pr.Project_ID = p.Project_ID;
#Task - 2
SELECT e.Emp_Name, d.Dept_Name, p.Rating FROM Employee e JOIN Department d ON e.Dept_ID = d.Dept_ID JOIN Performance p ON e.Emp_ID = p.Emp_ID WHERE p.Rating = ( SELECT MAX(p2.Rating) FROM Performance p2 JOIN Employee e2 ON p2.Emp_ID = e2.Emp_ID WHERE e2.Dept_ID = e.Dept_ID);
#Task - 3
SELECT Emp_Name FROM Employee WHERE Emp_ID NOT IN (SELECT Emp_ID FROM Reward);
