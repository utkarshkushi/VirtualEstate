const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname+"/public/index1.html"));
})

app.get('/home', (req,res)=>{
    res.sendFile(path.join(__dirname + "/public/index.html"));
})

app.listen(5002, ()=>{
    console.log(`listening on the port 5002`);
})