const {createServer} = require('http');

const server = createServer((req,res) => {
    if(req.url ==='/'){
        res.write('I made a web page!')
        res.end()
    }
    if(req.url ==='/about'){
        res.write('I am David!')
        res.end()
    }
    res.end()
})

server.listen(3000);