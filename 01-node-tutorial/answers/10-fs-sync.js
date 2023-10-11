const {writeFileSync, readFileSync} = require('fs');

writeFileSync('./temporary/fileA.txt', 'This is line one\n');
writeFileSync('./temporary/fileA.txt', 'This is line two\n', {flag:'a'});
writeFileSync('./temporary/fileA.txt', 'This is line three', {flag:'a'});

let fileContent = readFileSync('./temporary/fileA.txt', 'utf8');

console.log(fileContent);