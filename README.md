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

![Alt text](/passgen.jpg?raw=true "Node Passgen Screenshot")

## Libraries
node-passgen makes use of two modules to generate a password and to test password strength.

### secure-random-password

https://www.npmjs.com/package/secure-random-password

secure-random-password is a password generator that wraps secure-random so your passwords will be generated using a cryptographically-secure source of entropy, whether running in the browser or Node.js. It has support to generate passwords that meet arbitrary complexity requirements.

### zxcvbn

https://www.npmjs.com/package/zxcvbn

zxcvbn is a password strength estimator inspired by password crackers. Through pattern matching and conservative estimation, it recognizes and weighs 30k common passwords, common names and surnames according to US census data, popular English words from Wikipedia and US television and movies, and other common patterns like dates, repeats (aaa), sequences (abcd), keyboard patterns (qwertyuiop), and l33t speak.

## Password Score

zxcvbn creates a password score from 0 - 4, which node-passgen multiplies by 20 to create base scores of 0, 20, 40, 60, and 80. Passwords then receive bonus points based on password length and complexity. Obtaining a score of 100 requires an 80 from zxcvbn AND a password length of at least 24 characters, AND at least one of each, upper case, number and special character. 

### Reasoning 

It is my belief that length is king when it comes to password security. Not re-using passwords is just as important. The next most important item is memorability. The least important is complexity. Attackers rarely use brute force techniques anymore, and instead opt for caches from data breachers and password re-use attacks. I believe the following type of password is far superior (if your platform allows things like spaces).

* This is 1 quote from my favorite movie!

As opposed to this:

* Ag$l_0qr3zxcvbn123

Ultimately, using a password manager and 2-factor authentication will be the best methods for security so you don't have to remember dozens or more complex passwords.