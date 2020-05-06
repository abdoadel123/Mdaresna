
const express=require('express');
const router=express.Router();
const mongoose =require('mongoose');


const feedbackModel=require('../Models/feedbackModel');
const studentModel=require('../Models/studentModel');
const homeworkModel=require('../Models/homeworkModel');
const levelModel=require('../Models/levels')

const gradeModel=require('../Models/gradeModel')

const Attend=require('../Models/attendModel');

router.get('/feedbacks/:sid/:subject',(req,res,next)=>{
    const id=req.params.sid;
    const mysubject=req.params.subject;
    feedbackModel.find()
        .select('feedback date')
        .where({s_id:id , subject:mysubject})
        .exec()
        .then((docs)=>{
            res.status(200); 
            res.json(docs);
            res.end();
        })
        .catch((err)=>{
            console.log(err);
            res.status(500); 
            res.json('can not get student feedback .');
        });
});

//Show attend
router.get('/attend/show/:id', (req, res, next) => {
    const sid=req.params.id;
    Attend.find()
        .select('subjectName absent')
        .where({studentID : sid})
        .exec()
        .then((docs) => {
            res.status(200);
            res.json(docs);
            res.end();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err }).end();
        });
});


//////////////////////////////   today ////////////////////////////////////////////////

//// gethomework

router.get('/homeworks/:sid/:level/:class',(req,res,next)=>{
   
    const studentlevel=req.params.level; ///////////////// men el app hygbha men el window
    const studentclass=req.params.class;   
    const sid=req.params.sid;

    homeworkModel.find()
        .select('date subject task')
        .where({level:studentlevel , class:studentclass  })
        .exec()
        .then((docs)=>{

            res.status(200); 
            res.json(docs);
            res.end();
        })
        .catch((err)=>{
            console.log(err);
            res.status(500); 
            res.json('can not get student homework .');
        });
});

////////////////////////////////////   get subjects of students

router.get('/getmysubjects/:sid/:level/:class',(req,res,next)=>{
    const studentid=req.params.sid;
    const studentlevel = req.params.level;
    const studentclass=req.params.class;

    levelModel.find()
        .select('subject')
        .where({level:studentlevel , class:studentclass  })
        .exec()
        .then((docs)=>{

            res.status(200); 
            res.json(docs);
            res.end();
        })
        .catch((err)=>{
            console.log(err); 
            res.status(500); 
            res.json('can not get student subjects .');
        });
});

////// get home informations

router.get('/home/:sid',(req,res,next)=>{
    const studentid=req.params.sid;

    studentModel.find()
        .select('name level classNume')
        .where({studentID: studentid  })
        .exec()
        .then((docs)=>{
            res.status(200); 
            res.json(docs);
            res.end();
        })
        .catch((err)=>{
            console.log(err);
            res.status(500); 
            res.json('can not get student Informations .');
        });
});

// get grades  of subject 

router.get('/grades/:myid/:subject',(req,res,next)=>{
   
    const myid=req.params.myid; ///////////////// men el app hygbha men el window
    const subject=req.params.subject;

    gradeModel.find()
        .select('description grade')
        .where({studentid:myid , subject:subject  })
        .exec()
        .then((docs)=>{
            res.status(200); 
            res.json(docs);
            res.end();
        })
        .catch((err)=>{
            console.log(err);
            res.status(500); 
            res.json('can not get student homework .');
        });
});


module.exports=router;