-- create seed for testing --
INSERT INTO department (name)
VALUES ("Operations"),
    ("Mechanical"),
    ("Signal"),
    ("Section");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager of Operations", 110000, 1),
    ("Engineer", 150000, 1),
    ("Conductor", 120000, 1),
    ("Manager of Mechanical", 110000, 2),
    ("Carman Crane", 80000, 2),
    ("Lead Carman", 78000, 2),
    ("Carman", 70000, 2),
    ("Manager of Signal", 100000, 3),
    ("Signal Maintainer", 75000, 3),
    ("Manager of Section", 80000, 4),
    ("Machine Operator", 70000, 4),
    ("Track Laborer", 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Shane", "Geng", 1, null),
    ("Dave", "Camp", 2, 1),
    ("Lucas", "Short", 3, 1),
    ("Ryan", "Miller", 4, null),
    ("Larry", "Millerin", 5, 4),
    ("Grant", "Musgrave", 6, 4),
    ("Brent", "Mat", 7, 4),
    ("John", "Smith", 8, null),
    ("Bill", "Wags", 9, 8),
    ("Jon", "Wise", 10, null),
    ("Kyle", "Yell", 11, 10),
    ("Barry", "Buys", 12, 10);