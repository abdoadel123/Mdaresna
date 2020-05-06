const express =require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoos = require('mongoose');

const messageRouting= require('./APIs/routes/messages');
const studentRouting= require('./APIs/routes/student');
const teacherRouting=require('./APIs/routes/teacher');
const adminRouting =require('./APIs/routes/admin')
const mongoose=require('mongoose');

const dbName = 'Orman'
try {
    mongoos.connect('mongodb://127.0.0.1:27017/' + dbName);
}
catch(err){
    console.log('Erorr Here')
}
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("body-parser").json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origine, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/message',messageRouting);

app.use('/student',studentRouting);
app.use('/teacher',teacherRouting);
app.use('/admin',adminRouting);
app.use('/',(req,res,next)=>{res.status(200).json({mess:'No Rout Found '});});

///////////////////////////////////////////     today 


app.use((req, res, next) => {
    const erorr = new Erorr('Not Found');
    error.status = 400;
    nexr(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports=app;