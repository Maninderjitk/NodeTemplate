
var validator=require('validator');
var  chalk = require('chalk');

console.log("is Email-",validator.isEmail("abcd@example.com"));
console.log("is Url-",validator.isURL("https:abcd.com"));
console.log(chalk.blue("Success!!"));
console.log(chalk.bgCyan.bold("another msg"));