-- DML seed data script for COMPANY database (Problem 1)[cite: 1, 2, 3]
USE company;

-- Temporarily disable foreign key checks for initial bootstrap insertion
SET FOREIGN_KEY_CHECKS = 0;

-- Insert Departments
INSERT INTO DEPARTMENT (Dnumber, Dname, mgr_ssn, mgr_start_date) VALUES 
(1, 'Research', '111111111', '2020-01-01'),
(2, 'Administration', '222222222', '2019-05-15'),
(3, 'Headquarters', '333333333', '2018-10-10');

-- Insert Employees (at least 3 records)[cite: 2]
INSERT INTO EMPLOYEE (ssn, fname, lname, bdate, address, gender, salary, Dno) VALUES 
('111111111', 'John', 'Smith', '1985-04-12', '123 Main St', 'M', 55000.00, 1),
('222222222', 'Franklin', 'Wong', '1990-12-08', '456 Oak Rd', 'M', 48000.00, 2),
('333333333', 'Alicia', 'Zelaya', '1988-07-19', '789 Pine Ln', 'F', 60000.00, 3);

-- Insert Projects (at least 3 records)[cite: 2]
INSERT INTO PROJECT (Pnumber, Pname, Plocation, Dno) VALUES 
(10, 'ProductX', 'Bellaire', 1),
(20, 'ProductY', 'Sugarland', 1),
(30, 'Reorganization', 'Houston', 2);

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;