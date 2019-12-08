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


