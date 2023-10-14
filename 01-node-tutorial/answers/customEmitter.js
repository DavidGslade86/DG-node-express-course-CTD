const {readFile} = require("fs").promises;
const EventEmitter = require('events');
const path = require('path');

const fullPath = path.join(__dirname, 'temp.txt');
let fileName = path.basename(fullPath);

const customEmitter = new EventEmitter();

const promiseEmitter = new EventEmitter();

promiseEmitter.on('files', (file, fileInfo)=>{
    console.log (`The text in ${file} is ${fileInfo}`);
})

const waitEvent = async () => {
    try {
        const fileInfo = await readFile('./temp.txt', 'utf8');
        promiseEmitter.emit('files', fileName, fileInfo);
    } catch(err) {
        console.log(err);
    }
}

customEmitter.on('response', (name, password)=> {
    console.log(`I got a response! It was the name ${name} and the password ${password}`)
});

customEmitter.on('response', (name)=> {
    console.log(`I am doing something else for ${name}`)
});

waitEvent();
customEmitter.emit('response', 'David', 1234)