const http = require('http');
const path = require('path');


const bodyParser = require('body-parser');
const express = require('express');
const rootDir = require('./util/path');


const app = express();

app.set('views', 'views'); 
app.set('view engine', 'ejs');  

app.use(express.static(path.join(__dirname, "public")))

app.use(bodyParser.urlencoded({ extended: true }));



//Js file starts

var taskLeft = ["complete project", "Make presentation"];
var taskCompleted = ["Study dsa"];

app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    if(newTask) {
        taskLeft.push(newTask);
    }
    
    res.redirect("/main");
});

app.post("/removetask", function(req, res) {
    var completeTask = req.body.check;
    
    if (typeof completeTask === "string") {
        taskCompleted.push(completeTask);
        taskLeft.splice(taskLeft.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            taskCompleted.push(completeTask[i]);
            taskLeft.splice(taskLeft.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect("/main");
});


app.get('/main', (req, res, next) => {
    res.render('main', {task: taskLeft, complete: taskCompleted})
});

app.get('/',(req, res, next) => {
    res.render('index');
});


app.get('/main', (req, res, next) => {
    res.render('main');
})




app.listen(3000);