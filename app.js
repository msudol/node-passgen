/**
 * Node Passgen - As a school assignment, develop a utility that generates strong passwords and checks the strength of a user entered password. 
 * @license MIT
 *
 *  https://github.com/msudol/node-passgen
 */
 
'use strict';

// get our config values
const config = require('./config/config.js');

// password strength library zxcvbn
const zxcvbn = require('zxcvbn');

// cryptographically secure password generation library
const password = require('secure-random-password');

// readline to create a pseudo-CLI program
const readline = require('readline');

// create interface r1
const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

console.log("=== Node-Passgen Commands ===");
console.log(" * passgen: generate a secure password");
console.log(" * checkpass SomePassord: check a password's strength");
console.log(" * quit: close this program");

// set a prompt and to the prompt
rl.setPrompt(config.prefix);
rl.prompt();
 
// line event - basically creates a stream cli
rl.on('line', function(line) {
 
    // close if user types quit
    if (line === "quit" || line === "q") {
        rl.close();
    }
    // passgen
    else if (line.startsWith("passgen")) {
        // run command here
        console.log(password.randomPassword());
        rl.prompt();
    }
    // checkpass [input]
    else if (line.startsWith("checkpass")) {
        // split on first space, everything after is considered the password
        var newline = line.split(/ (.+)/)[1];
        // run command here
        console.log(zxcvbn(newline));
        //TODO: parse this and make our own determination from the library results.
        
        rl.prompt();
    }    
    // run the setvar code (eval a string basically)
    else if (line.startsWith("?") || line.startsWith("help")) {
        console.log("Try the following commands out:  \n > passgen \n > checkpass somepasswordhere \n > q or quit");
        rl.prompt();
    }        
    else {
        rl.prompt();
    }
    
});

// close event
rl.on('close',function(){
    console.log("\nClosing... bye bye!");
    process.exit(0);
});