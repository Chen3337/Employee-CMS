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
  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

var mainManuOptions = ["veiw all employee","add employee", "remove employee","update employee role","veiw all role","add role", "remove roles", "add departments", "remove departments" ,"veiw all department", "quit"]


function mainManu(){
    inquirer.prompt([
    {
        type : "rawlist",
        name : "answer",
        message : "what may i help you with?",
        choices : mainManuOptions
    }
    ]).then(function(answer){
        switch(answer.answer){
            case("veiw all employee"):
            veiwAllEmployees();
            break;
            case("veiw all role"):
            case("veiw all department"):
            veiwdatas(answer.answer);
            break;
            case("add employee"):
            veiwRoles();
            break;
            case("add role"):
            break;
            case("add departments"):
            break;
            case("remove employee"):
            case("remove roles"):
            case("remove departments"):
            break;
            default:
                process.exit(11);
            break;


        }
        
    });
}
// gets data from the mysql and display it
function veiwdatas(choosed){
    var n = choosed.split(" ");
    var table = n[n.length - 1];
    connection.query("SELECT * FROM " + table, function(err, results){
        if(err) {throw err};
        console.table(results);
        mainManu();
    });
}
function veiwAllEmployees(){
    var query = `SELECT first_name, last_name, title, salary, name, manager_name FROM employee join role ON employee.role_id = role.id
    join department ON role.department_id = department.id`;
    connection.query(query, function(err, results){
        if(err) {throw err};
        console.table(results);
        mainManu();
    });
}

function addEmployee(roles, managers){
    inquirer.prompt([
        {
            type : "input",
            name : "firstName",
            message : "Enter the first name: "
        },
        {
            type : 'input',
            name : "lastName",
            message : "Enter the last name: "
        },
        {
            type : "rawlist",
            name : "role",
            message : "Choose a role",
            choices : roles
        },
        {
            type : "rawlist",
            name : "manager",
            message : "choose a manager",
            choices : managers
        }
    ]).then(function(results){
        mainManu();
    })
    
}

function veiwRoles(){

    connection.query(`SELECT title FROM role`, function(err, results){
        if(err) {throw err};
        var result = [];
        for(i = 0; i < results.length; i++){
            result.push(results[i].title);
        }
        connection.query("SELECT first_name, last_name, id FROM employee",function(err, managerNames){
            if(err) {throw err};
            var names = ["no manager"];
            for(i=0; i < managerNames.length; i++){
                var name = managerNames[i].first_name + " " + managerNames[i].last_name;
                names.push(name);
            }
            addEmployee(result, names);
        })
        
    });
}

mainManu();