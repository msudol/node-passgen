// config.js

'use strict';

// Static config, do not edit
let config = {};
config.passgen = {};
config.checkpass = {};

// CLI prefix
config.prefix = 'CMD> ';

// defaults for passgen and genmode command
config.genmode = "default";
config.passgen.passlength = 16;
config.passgen.ascii = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~";



module.exports = config;