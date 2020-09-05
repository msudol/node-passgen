# node-passgen
As a school assignment, develop a utility that generates strong passwords and checks the strength of a user entered password.

## Installing & Running
Installation requires Node.js to be installed as a pre-requisite. Visit https://nodejs.org 

1. Clone project source into a directory
2. Run command > npm install
3. NPM the Node Package Manager will setup node-passgen and any depenendcies
4. Run command > node app

Running the app will present a CLI that prompts for user input. The following commands are available:

* genmode: takes an argument of default|ascii to set the password generation mode
* passgen: generates a secure password in chosen mode, with optional length argument
* checkpass: takes a single argument which is a password, and provides a strength score
* quit: exits the program

## Libraries
node-passgen makes use of two modules to generate a password and to test password strength.

### secure-random-password

https://www.npmjs.com/package/secure-random-password

secure-random-password is a password generator that wraps secure-random so your passwords will be generated using a cryptographically-secure source of entropy, whether running in the browser or Node.js. It has support to generate passwords that meet arbitrary complexity requirements.

### zxcvbn

https://www.npmjs.com/package/zxcvbn

zxcvbn is a password strength estimator inspired by password crackers. Through pattern matching and conservative estimation, it recognizes and weighs 30k common passwords, common names and surnames according to US census data, popular English words from Wikipedia and US television and movies, and other common patterns like dates, repeats (aaa), sequences (abcd), keyboard patterns (qwertyuiop), and l33t speak.


