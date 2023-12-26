const express = require('express')
const peopleRouter = require('./routes/people.js');
const authRouter = require('./routes/authorization.js')
const app = express();
const cookieParser = require('cookie-parser');  

const logger = (req, res, next)=> {
    const method = req.method;
    const url = req.url;
    const time = new Date ();

    console.log(method, url, time);
     next();
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(logger);
app.use(express.static('./methods-public'));
app.use('/api/v1/people', peopleRouter)
app.use('', authRouter)

/*
app.get('/api/v1/people', (req, res) => {
    res.status(200).json(people);
});

app.post('/api/v1/people',(req, res)=> {
    console.log(req.body)
    const name = req.body.name
    if(name){
        people.push({
            id : people.length + 1, 
            name: name
        });
        return res.status(201).json({ success: true, name: req.body.name });
    }

    res.status(400).json({ success: false, message: "Please provide a name" });
})
*/

app.all('*', (req, res) => {
    res.status(404).send('resource not found');
})

app.listen(3000,()=>{
    console.log('server is listening on port 3000')
})