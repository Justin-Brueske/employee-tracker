-- create db and tables --
DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
    id INT NOT NUll PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT NOT NUll PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INT,
    Foreign Key (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NUll PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    Foreign Key (role_id) REFERENCES role(id),
    Foreign Key (manager_id) REFERENCES employee(id)
);