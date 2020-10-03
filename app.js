const http = require('http');
const path = require('path');

const express = require('express');
const rootDir = require('./util/path');


const app = express();

// app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "views")));
app.set('views', 'views');   

app.get('/',(req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'index.html'));
});



app.listen(3000);