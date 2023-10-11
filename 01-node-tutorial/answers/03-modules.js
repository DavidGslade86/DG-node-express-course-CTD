const names = require('./04-names');
const sayHi = require('./05-utils');
const {buddies} = require('./06-alternative-flavor');
const {stuff} = require('./06-alternative-flavor');
require("./07-mind-grenade");

console.log(names, buddies, stuff);

sayHi(names.david);
