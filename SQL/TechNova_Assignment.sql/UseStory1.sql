# Task -1
Create database TechNovaDB;
Use TechNovaDB;
#Task -2
CREATE TABLE Department (Dept_ID INT PRIMARY KEY,Dept_Name VARCHAR(50),Location VARCHAR(50)
);
CREATE TABLE Employee (Emp_ID INT PRIMARY KEY,Emp_Name VARCHAR(50),Gender CHAR(1),DOB DATE,Hire_Date DATE,Dept_ID INT,FOREIGN KEY (Dept_ID) REFERENCES Department(Dept_ID)
);
CREATE TABLE Project (Project_ID INT PRIMARY KEY,Project_Name VARCHAR(50),Dept_ID INT,Start_Date DATE,End_Date DATE,FOREIGN KEY (Dept_ID) REFERENCES Department(Dept_ID)
);
CREATE TABLE Performance (Emp_ID INT,Project_ID INT,Rating INT,Review_Date DATE,PRIMARY KEY (Emp_ID, Project_ID),FOREIGN KEY (Emp_ID) REFERENCES Employee(Emp_ID),FOREIGN KEY (Project_ID) REFERENCES Project(Project_ID)
);
CREATE TABLE Reward (Emp_ID INT,Reward_Month DATE,Reward_Amount DECIMAL(10,2),FOREIGN KEY (Emp_ID) REFERENCES Employee(Emp_ID)
);
#Task 3: Define primary keys,foreign keys and constraints :
#Implemented using PRIMARY KEY and FOREIGN KEY in all tables above
#Task -4
CREATE INDEX idx_empname ON Employee(Emp_Name);
CREATE INDEX idx_deptid ON Employee(Dept_ID);



