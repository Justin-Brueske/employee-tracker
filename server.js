const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection({
    host: 'Localhost',
    user: 'root',
    password: 'darkness',
    database: 'employee_tracker_db'
});

db.connect(function(err) {
    if (err) throw err;
    startTracker();
});

function startTracker() {
    inquirer.prompt ({
        type: "list",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View all roles",
            "Add Role",
            "View all Departments",
            "Add Department",
            "Exit"
        ],
        message: "What do you want to do?",
        name: "option"
    })
    .then(data => {
        if (data.option == "View All Employees") {
            viewEmployees();
        } else if (data.option == "Add Employee") {
            addEmployee();
        } else if (data.option == "Update Employee Role") {
            updateEmployee();
        } else if (data.option == "View all roles") {
            viewRoles();
        } else if (data.option == "Add Role") {
            addRole();
        } else if (data.option == "View all Departments") {
            viewDepartments();
        } else if (data.option == "Add Department") {
            addDepartment();
        } else if (data.option == "Exit") {
            console.log("Goodbye");
            db.end();
        }
    })
}

function viewEmployees() {
    db.query(`SELECT 
    employee.id AS Id,
     employee.first_name AS First,
      employee.last_name AS Last,
       role.title AS 'Job Title',
        department.name AS Department,
         role.salary AS Salary,
          CONCAT(x.first_name, ' ', x.last_name) AS Manager
           FROM employee JOIN role ON employee.role_id = role.id 
           JOIN department ON role.department_id = department.id 
           LEFT JOIN employee x ON employee.manager_id = x.id
           ORDER BY employee.id;
       `, function(err,res) {
        if (err) throw err;
        console.table(res);
        startTracker();
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the first name of the employee you would like to add?",
            name: "first"
        },
        {
            type: "input",
            message: "What is the last name for the employee you would like to add?",
            name: "last" 
        },
        {
            type: "number",
            message: "What is the role of the employee you would like to add?",
            name: "roleId" 
        },
        {
            type: "number",
            message: "Who is the manager of the employee you would like to add?",
            name: "managerId"
        }])
        .then(data => {
        db.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [data.first, data.last, data.roleId, data.managerId], function(err, res) {
            if (err) throw err;
            console.table(res);
            startTracker();
        })
    });
}

function updateEmployee() {
    inquirer.prompt([
        {
            type: "number",
            message: "Which employee would you like to update by Id?",
            name: "employeeId" 
        },
        {
            type: "number",
            message: "Which role would you like to change them to by Id?",
            name: "roleId"
        }])
        .then(data => {
        db.query("UPDATE employee SET role_id=? WHERE id=?", [data.roleId, data.employeeId], function(err, res) {
            if (err) throw err;
            console.table(res);
            startTracker();
        })
    });
}

function viewRoles() {
    db.query(`SELECT role.id AS Id,
                 role.title AS Title,
                  role.salary AS Salary,
                   department.name AS Department
                    FROM role LEFT JOIN department ON role.department_id = department.id`, function(err,res) {
        if (err) throw err;
        console.table(res);
        startTracker();
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the role you would like to add?",
            name: "roleName"
        },
        {
            type: "input",
            message: "What is the salary for the role you would like to add?",
            name: "salaryTotal" 
        },
        {
            type: "number",
            message: "What is the department id of the role you would like to add?",
            name: "deptId"
        }])
        .then(data => {
        db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [data.roleName, data.salaryTotal, data.deptId], function(err, res) {
            if (err) throw err;
            console.table(res);
            startTracker();
        })
    });
}

function viewDepartments() {
    db.query(`SELECT department.id AS Id, department.name AS Department FROM department`, function(err,res) {
        if (err) throw err;
        console.table(res);
        startTracker();
    });
}

function addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "deptname"
    })
    .then(data => {
        db.query("INSERT INTO department (name) VALUES (?)", [data.deptname], function(err, res) {
            if (err) throw err;
            console.table(res);
            startTracker();
        })
    });
}
