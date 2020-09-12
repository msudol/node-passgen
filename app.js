/**
 * node-passgen - As a school assignment, develop a utility that generates strong passwords and checks the strength of a user entered password. 
 * @license MIT
 *
 *  https://github.com/msudol/node-passgen
 */
 
'use strict';

// get config values
const config = require('./config/config.js');

// password strength library zxcvbn
const zxcvbn = require('zxcvbn');

// cryptographically secure password generation library
const password = require('secure-random-password');

// readline to create a pseudo-CLI program
const readline = require('readline');

// chalk - https://www.npmjs.com/package/chalk
const chalk = require('chalk');

// create interface r1
const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

// function to show a nice UI menu
function showMenu() {
    // show menu
    console.log(chalk.inverse("=== Node-Passgen Commands ==="));
    console.log(chalk.magentaBright(" * genmode [string default|ascii]: set the passgen gen mode"));
    console.log(chalk.magentaBright(" * passgen [int length]: generate a secure password"));
    console.log(chalk.magentaBright(" * checkpass [string SomePassord]: check a password's strength"));
    console.log(chalk.magentaBright(" * quit: close this program"));    
}

// display the mention
showMenu();

// set a prompt and to the prompt
rl.setPrompt(config.prefix);
rl.prompt();
 
// line event - basically creates a stream cli
rl.on('line', function(input) {
    
    // accept upper and lower input
    let line = input.toLowerCase();
    
    // close if user types quit
    if (line === "quit" || line === "q") {
        rl.close();
    } 
    
    // set genmode for fun allow some different password complexities
    else if ((line === "genmode") || (line.startsWith("genmode "))) {
        
        // split on first space, everything after is considered the args
        let args = input.split(/ (.+)/)[1];

        // make sure there are arguments
        if ((args === undefined) || (args === null)) {
            console.log("> No arguments defined. Keeping current genmode");
            rl.prompt();
        }
        else if (args === "default") {
            console.log("> Setting genmode to default");
            config.genmode = "default";
            rl.prompt();
        }
        else if (args === "ascii") {
            console.log("> Setting genmode to full printable ascii");
            config.genmode = "ascii";
            rl.prompt();
        }
        else {
            console.log("> Unknown genmode. Keeping current genmode");
        }
        
        rl.prompt();
    }  
    
    // passgen
    else if ((line === ("passgen")) || (line.startsWith("passgen "))) {
        
        let gen = true;
        
        let passlength = config.passgen.passlength;
        
        // split on first space, everything after is considered the args
        let args = input.split(/ (.+)/)[1];
        
        // input should be only int
        let intreg = /^\d+$/;
        
        if ((args !== undefined) && (args !== null)) {
            if ((intreg.test(args)) && (args >= 4) && (args < 129)) {
                passlength = parseInt(args);
            }
            else {
                gen = false;
                console.log("> passgen argument must be an integer from 4 - 128");
            }
        }
        
        if (gen) {
            // fully random string using all the printable ascii letters
            if (config.genmode == "ascii") {
                console.log(chalk.greenBright.bold(password.randomString({length: passlength, characters: config.passgen.ascii})));
            }
            // reduced special character set, lower entropy
            else {
                console.log(chalk.greenBright.bold(password.randomPassword({length: passlength, characters: [password.lower, password.upper, password.digits, password.symbols]})));
            }
        }
        
        rl.prompt();   
    }
    
    // checkpass [input]
    else if ((line === "checkpass") || (line.startsWith("checkpass "))) {
        
        // split on first space, everything after is considered the args
        let args = input.split(/ (.+)/)[1];
        
        if ((args === undefined) || (args === null)) {
            console.log("> checkpass requires input, try again...");
            rl.prompt();
        }
        else {
            // run command here
            let result = zxcvbn(args);
          
            // the library scores 0 - 4, so we'll multiply by 20 to create base scores of 0, 20, 40, 60, 80 and then award bonus points on other factors.
            let score = result.score * 20;
            
            // give some bonuses, up to 20 points so an 80 can make it to 100, and -5 for anything less than 8 chars even it is it strong
            let bonus = 0;
            
            // arbitrary bonus for password length
            if (args.length < 8) bonus -= 5; // a good, complex 7 char password is still a bad password in my book
            if (args.length > 7) bonus += 1;
            if (args.length > 11) bonus += 2;
            if (args.length > 15) bonus += 3;
            if (args.length > 19) bonus += 4;
            if (args.length > 23) bonus += 5;
            
            // bonus for a number
            let intreg = /[0-9]/;
            if (intreg.test(args)) bonus += 1;

            // bonus for an uppercase
            let capreg = /[A-Z]/;
            if (capreg.test(args)) bonus += 1;

            // bonus for an special char
            let specreg = /[ !\\"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]/;
            if (specreg.test(args)) bonus += 3;
            
            let finalscore = score + bonus;
            if (finalscore > 100) finalscore = 100;
            if (finalscore < 0) finalscore = 0;
            
            console.log(chalk.greenBright.bold("> Password Score [0-100]: " + finalscore));
            
            rl.prompt();
        }
    }    
    
    // help menu
    else if (line.startsWith("?") || line.startsWith("help")) {
        showMenu();
        rl.prompt();
    }      
    // prompt again
    else {   
        console.log("> Unknown command");
        rl.prompt();
    }
    
});

// close event
rl.on('close',function(){
    console.log(chalk.greenBright("\n> Closing... bye bye!"));
    process.exit(0);
});