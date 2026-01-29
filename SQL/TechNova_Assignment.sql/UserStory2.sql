#Task - 1 - Insert
INSERT INTO Department VALUES
(101,'IT','Bangalore'),
(102,'HR','Delhi'),
(103,'Finance','Mumbai'),
(104,'Sales','Hyderabad'),
(105,'Support','Chennai');

INSERT INTO Employee VALUES
(1,'Asha','F','1990-07-12','2018-06-10',101),
(2,'Raj','M','1988-04-09','2020-03-22',102),
(3,'Neha','F','1995-01-15','2021-08-05',101),
(4,'Arjun','M','1992-11-10','2019-02-14',103),
(5,'Kiran','M','1993-05-20','2022-01-01',104);

INSERT INTO Project VALUES
(201,'ERP Upgrade',101,'2023-01-01','2023-06-30'),
(202,'HR Portal',102,'2023-02-01','2023-07-31'),
(203,'Finance Audit',103,'2023-03-01','2023-08-31'),
(204,'CRM Tool',104,'2023-04-01','2023-09-30'),
(205,'Helpdesk App',105,'2023-05-01','2023-10-31');

INSERT INTO Performance VALUES
(1,201,4,'2023-12-01'),
(2,202,3,'2023-12-05'),
(3,201,5,'2023-12-10'),
(4,203,4,'2023-12-15'),
(5,204,2,'2023-12-20');

INSERT INTO Reward VALUES
(1,'2024-01-01',1500),
(2,'2024-01-01',900),
(3,'2024-02-01',2500),
(4,'2024-02-01',3000),
(5,'2024-03-01',1200);

# Task-2 - Update
UPDATE Employee
SET Dept_ID = 103
WHERE Emp_ID = 2;

#Task -3 Delete
DELETE FROM Reward
WHERE RewardAmount < 1000;




