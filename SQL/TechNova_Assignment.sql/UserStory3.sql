#Task-1
SELECT * FROM Employee WHERE Hire_Date > '2019-01-01';

#Task -2
SELECT d.Dept_Name, AVG(p.Rating) AS Avg_Rating
FROM Employee e
JOIN Department d ON e.Dept_ID = d.Dept_ID
JOIN Performance p ON e.Emp_ID = p.Emp_ID
GROUP BY d.Dept_Name;

#Task -3
SELECT Emp_Name,TIMESTAMPDIFF(YEAR,DOB,CURDATE()) AS Age FROM Employee;

#Task -4
SELECT SUM(Reward_Amount) AS Total_Rewards FROM Reward WHERE YEAR(Reward_Month) = YEAR(CURDATE());

#Task -5
SELECT e.Emp_Name, r.Reward_Amount FROM Employee e JOIN Reward r ON e.Emp_ID = r.Emp_ID WHERE r.Reward_Amount > 2000;
