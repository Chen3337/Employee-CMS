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
            case("veiw all role"):
            case("veiw all department"):
                veiwdatas(answer.answer);
            break;
            case("add employee"):
            case("add role"):
            case("add departments"):
            break;
            case("remove employee"):
            case("remove roles"):
            case("remove departments"):
            break;


        }
        
    });
}

function veiwdatas(choosed){
    var n = choosed.split(" ");
    var table = n[n.length - 1];
    connection.query("SELECT * FROM " + table, function(err, results){
        if(err) {throw err};
        console.table(results);
        mainManu();
    });
}


mainManu();