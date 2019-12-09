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

var mainManuOptions = ["veiw all employees", "veiw all employees by department", "veiw all employees by manager", "add employee", "remove employee", "update employee manager", "update employee role","veiw roles","add roles", "remove roles", "add departments", "remove departments" ,"veiw all departments", "quit"]


function mainManu(){
    inquirer.prompt([{
        type : "rawlist",
        name : "answer",
        message : "what may i help you with?",
        choices : mainManuOptions
    }
    ])
}
mainManu();