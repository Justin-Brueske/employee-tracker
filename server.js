const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection({
    host: 'Localhost',
    user: 'root',
    password: 'darkness',
    database: 'employee_tracker_db'
});



