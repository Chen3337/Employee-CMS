var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require("console.table");
var CFonts = require("cfonts");

// got this to just display the title Employee manager..
CFonts.say('Employee|Manager!', {
    font: 'block',
    align: 'center',
    colors: ['system'],
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: '0',
});

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_db"
});

// Initiate MySQL Connection.
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

var mainManuOptions = ["veiw all employee", "add employee", "remove employee", "update employee role", "veiw all role", "add role", "remove role", "add departments", "remove department", "veiw all department", "quit"]


function mainManu() {
    inquirer.prompt([
        {
            type: "rawlist",
            name: "answer",
            message: "what may i help you with?",
            choices: mainManuOptions
        }
    ]).then(function (answer) {
        switch (answer.answer) {
            case ("veiw all employee"):
                veiwAllEmployees();
                break;
            case ("veiw all role"):
            case ("veiw all department"):
                veiwdatas(answer.answer);
                break;
            case ("add employee"):
                addEmployeeInfos();
                break;
            case ("add role"):
                addRole();
                break;
            case ("add departments"):
                addDepartment();
                break;
            case ("remove employee"):
            case ("remove role"):
            case ("remove department"):
                deleting(answer.answer);
                break;
            default:
                process.exit(11);
                break;
        }

    });
}
// gets data from the mysql and display it for view role and department
function veiwdatas(choosed) {
    var n = choosed.split(" ");
    var table = n[n.length - 1];
    connection.query("SELECT * FROM " + table, function (err, results) {
        if (err) { throw err };
        console.table(results);
        mainManu();
    });
}
// it will return all employee information for view all employees
function veiwAllEmployees() {
    var query = `SELECT employee.id, first_name, last_name, title, salary, name, manager_name FROM employee join role ON employee.role_id = role.id
    join department ON role.department_id = department.id`;
    connection.query(query, function (err, results) {
        if (err) { throw err };
        console.table(results);
        mainManu();
    });
}
// ask questions for a new employee for add new employees
function addEmployee(roles, managers) {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Enter the first name: "
        },
        {
            type: 'input',
            name: "lastName",
            message: "Enter the last name: "
        },
        {
            type: "list",
            name: "role",
            message: "Choose a role",
            choices: roles
        },
        {
            type: "rawlist",
            name: "manager",
            message: "choose a manager",
            choices: managers
        }
    ]).then(function (results) {
        var roleID = results.role.charAt(0);
        if (results.manager === "no manager") {
            var managerName = null;
        }
        else {
            var managerName = results.manager;
        }
        var query = `INSERT INTO employee(first_name, last_name, role_id, manager_name) VALUE (?, ?,${roleID}, "${managerName}");`;
        connection.query(query, [results.firstName.trim(), results.lastName.trim()], function (err) {
            if (err) throw err;
            mainManu();
        });
    })

}
// gets the information needed to add employee
function addEmployeeInfos() {
    connection.query(`SELECT title, id FROM role`, function (err, results) {
        if (err) { throw err };
        var result = [];
        for (i = 0; i < results.length; i++) {
            var roles = results[i].id + " : " + results[i].title;
            result.push(roles);
        }
        connection.query("SELECT first_name, last_name, id FROM employee", function (err, managerNames) {
            if (err) { throw err };
            var names = ["no manager"];
            for (i = 0; i < managerNames.length; i++) {
                var name = managerNames[i].first_name + " " + managerNames[i].last_name;
                names.push(name);
            }
            addEmployee(result, names);
        })
    });
}
// adding a new role
function addRole(){
    connection.query("SELECT * FROM department;", function(err, departments){
        var departmentList = [];
        for (i = 0; i < departments.length; i++) {
            var name = departments[i].id + " : " + departments[i].name;
            departmentList.push(name);
        };
        inquirer.prompt([
            {
                type : "input",
                name : "name",
                message : "Type in the new role name :"
            },
            {
                type : "number",
                name : "salary",
                message : "Please enter the salary :",
                validate: function(value){
                    if (isNaN(value)){
                        return "please enter a number";
                    }
                    return true;
                }
            },
            {
                type : "list",
                name : "department",
                message : "choose a department",
                choices : departmentList
            }
        ]).then(function(answers){
            var departID = answers.department.charAt(0);
            connection.query("INSERT INTO role(title, salary, department_id) VALUE(?, ?, ?)", [answers.name.trim(), answers.salary, departID] , function(err){
                if(err) throw err;
                mainManu();
            });
        });
    });
    
}
//adding a new department
function addDepartment(){
    inquirer.prompt([{
        type : "input",
        name : "name",
        message : "Enter new department name"
    }]).then(function(res){
        connection.query("INSERT INTO department SET ?",{name : res.name}, function(err){
            if(err) throw err;
            mainManu();
        })
    });
}
//deleting
function deleting(choosed){
    var n = choosed.split(" ");
    var table = n[n.length - 1];
    connection.query("SELECT * FROM " + table, function (err, results) {
        if (err) { throw err };
        var names = [];
        if(table === "employee"){
            for (i = 0; i < results.length; i++) {
                var name = results[i].id + " : " + results[i].first_name + " " + results[i].last_name;
                names.push(name);
            }
        }
        else if (table === "role"){
            for (i = 0; i < results.length; i++) {
                var roles = results[i].id + " : " + results[i].title;
                names.push(roles);
            }
        }
        else{
            for (i = 0; i < results.length; i++) {
                var department = results[i].id + " : " + results[i].name;
                names.push(department);
            }
        }
        inquirer.prompt([{
            type : "list",
            name : "name",
            message : "choose the " + table + "you want to delete",
            choices : names
        }]).then(function(anser){
            var id = anser.name.charAt(0);
            connection.query("DELETE FROM " + table +" WHERE id = " + id, function(err){
                if(err) throw err;
                mainManu();
            })
        });
    });
}
mainManu();