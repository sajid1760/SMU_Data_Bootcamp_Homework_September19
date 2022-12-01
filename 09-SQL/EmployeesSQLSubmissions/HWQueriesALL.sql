--Query 1
--List the following details of each employee: employee number, last name, first name, sex, and salary.

select 
	e.emp_no ,
	e.last_name ,
	e.first_name ,
	e.sex,
	s.salary
	
from 
	employees as e
	
join 
	salaries as s on s.emp_no = e.emp_no
	
	
limit 20;


--Query 2
--List first name, last name, and hire date for employees who were hired in 1986.

select 
	e.last_name ,
	e.first_name ,
	e.hire_date
	
from 
	employees as e
	
where
	extract(year from e.hire_date) = 1986
	
	
limit 20;

--Query 3
--List the manager of each department with the following information: department number, department name, 
--the manager's employee number, last name, first name.

select 
	dm.dept_no ,
	d.dept_name,
	dm.emp_no,
	e.last_name ,
	e.first_name
	
from 
	dept_manager as dm
	
join 
	departments as d on d.dept_no = dm.dept_no
join 
	employees as e on e.emp_no = dm.emp_no
	
	
limit 20;

--Query 4
--List the department of each employee with the following information: employee number, last name, first name, and department name.

select 
	e.emp_no ,
	e.last_name ,
	e.first_name ,
	d.dept_name
	
from 
	employees as e
	
join 
	dept_emp as de on de.emp_no = e.emp_no
join 
	departments as d on d.dept_no = de.dept_no
	
	
limit 20;

--Query 5
--List first name, last name, and sex for employees whose first name is "Hercules" and last names begin with "B."

select 
	e.last_name ,
	e.first_name ,
	e.sex
	
from 
	employees as e
	
where 
	e.first_name = 'Hercules' 
	AND e.last_name like 'B%'
	
	
limit 20;

-- Query 6:  
--List all employees in the Sales department, including their employee number, last name, first name, and department name.

select 
	e.emp_no ,
	e.last_name ,
	e.first_name ,
	d.dept_name
	
from 
	employees as e
	
join 
	dept_emp as de on de.emp_no = e.emp_no
join 
	departments as d on d.dept_no = de.dept_no

where 
	d.dept_name = 'Sales'
	
limit 20;


--Query 7
--List all employees in the Sales and Development departments, including their employee number, last name, 
--first name, and department name.

select 
	e.emp_no ,
	e.last_name ,
	e.first_name ,
	d.dept_name
	
from 
	employees as e
	
join 
	dept_emp as de on de.emp_no = e.emp_no
join 
	departments as d on d.dept_no = de.dept_no

where 
	d.dept_name = 'Sales'
	OR d.dept_name = 'Development'
	
limit 20;

--Query 8
--List the frequency count of employee last names (i.e., how many employees share each last name) in descending order.

select
	e.last_name,
	COUNT(last_name) as employee_count

from
	employees as e
	
group by
	last_name
	
order by
	employee_count DESC
