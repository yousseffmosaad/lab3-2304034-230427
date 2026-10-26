-- DDL script for COMPANY database (Problem 1)[cite: 1, 2]
DROP DATABASE IF EXISTS company;
CREATE DATABASE company;
USE company;

-- Create DEPARTMENT first without mgr_ssn constraint to handle bootstrap/circular dependency (Q1.3)
CREATE TABLE DEPARTMENT (
    Dnumber INT PRIMARY KEY,
    Dname VARCHAR(50) NOT NULL,
    mgr_ssn VARCHAR(9),
    mgr_start_date DATE
);

-- Create EMPLOYEE table with foreign key pointing to DEPARTMENT[cite: 2]
CREATE TABLE EMPLOYEE (
    ssn VARCHAR(9) PRIMARY KEY,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    bdate DATE,
    address VARCHAR(100),
    gender CHAR(1),
    salary DECIMAL(10,2),
    Dno INT,
    FOREIGN KEY (Dno) REFERENCES DEPARTMENT(Dnumber)
);

-- Add the circular foreign key for DEPARTMENT manager back using ALTER TABLE[cite: 1, 2]
ALTER TABLE DEPARTMENT 
ADD FOREIGN KEY (mgr_ssn) REFERENCES EMPLOYEE(ssn);

-- Create PROJECT table pointing to DEPARTMENT[cite: 2]
CREATE TABLE PROJECT (
    Pnumber INT PRIMARY KEY,
    Pname VARCHAR(50) NOT NULL,
    Plocation VARCHAR(50),
    Dno INT NOT NULL,
    FOREIGN KEY (Dno) REFERENCES DEPARTMENT(Dnumber)
);