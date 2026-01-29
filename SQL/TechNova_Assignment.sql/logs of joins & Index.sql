select 
  d.dept_name,
  count(e.emp_id) as employee_count
from department d
left join employee e
on d.Dept_ID = e.dept_ID
group by d.Dept_Name;
#Log:
-- +-------------+-----------+
-- | Dept_Name    | employee_count |
-- +-------------+-----------+
-- | IT          | 3               |
-- | HR          | 0               |
-- | Finance     | 2               |
-- | Sales       | 1               |
-- | Support     | 0               |
-- +-------------+------------------+
#Indexing
explain select * from employee where dept_id = 101;
#Log - Before Index
#1	SIMPLE	employee		ref	idx_deptid	idx_deptid	5	const	3	100.00	
#Creating Index
create index idx_employee_dept_id on employee(dept_id);
# Log - After Index
explain select * from employee where dept_id = 101;
#1	SIMPLE	employee		ref	idx_deptid,idx_employee_dept_id	idx_deptid	5	const	3	100.00	

