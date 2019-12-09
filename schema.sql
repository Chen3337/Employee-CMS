CREATE DATABASE employee_db;
USE employee_db;

-- Create the table actors.
CREATE TABLE employee
(
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar (30) NOT NULL,
  last_name varchar (30) NOT NULL,
  role_id int NOT NULL,
  manager_id int NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE role
(
	id int NOT NULL AUTO_INCREMENT,
    title varchar (30) NOT NULL,
    salary decimal(15,2),
    department_id int NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE department
(
	id int NOT NULL AUTO_INCREMENT,
    name varchar (30) NOT NULL,
    PRIMARY KEY(id)
)