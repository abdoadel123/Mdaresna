const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Student=require('../Models/studentModel');
const Teacher=require('../Models/teacherModel');
const Level=require('../Models/levels');
///Add Student

router.post('/studadd', (req, res, next) => {
    const student = new Student({
        _id: new mongoose.Types.ObjectId(),
        studentID: req.body.studentID,
        age: req.body.age,
        address: req.body.address,
        birthDate: req.body.birthDate,
        classNume: req.body.classNum,
        level: req.body.level,
        parentNumber: req.body.number,
        name: req.body.name,
        gender: req.body.gender,
        religion: req.body.religion,
        password:req.body.password
    });
    student
        .save()
        .then(result => {
            console.log("ok")
            res.status(200).json({
                message: 'atude Add Succefully',
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//////

//ADD teacher
router.post('/teachadd', (req, res, next) => {
    const teacher = new Teacher({
        _id: new mongoose.Types.ObjectId(),
        teacherID: req.body.teacherID,
        age: req.body.age,
        address: req.body.address,
        birthDate: req.body.birthDate,
        number: req.body.number,
        name: req.body.name,
        gender: req.body.gender,
        religion: req.body.religion,
        password:req.body.password
    });
    teacher
        .save()
        .then(result => {
            console.log("ok")
            res.status(200).json({
                message: 'teacher Add Succefully',
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
////
// Level

router.post('/level', (req, res, next) => {
    const level = new Level({
        _id: new mongoose.Types.ObjectId(),
        level: req.body.level,
        class: req.body.class,
        subject: req.body.subject,
        teacherID: req.body.teacherID
    });
    level
        .save()
        .then(result => {
            console.log("ok")
            res.status(200).json({
                message: 'level Add Succefully',
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
///////////////////////////////////////////////////

router.get('/login/teacher/:userID/:password', (req, res, next) => {
    userID = req.params.userID;
    password = req.params.password;
    Teacher.find()
        .select('teacherID age address birthDate number name gender religion')
        .where({ teacherID:userID,password:password})
        .exec()
        .then(doc => {
            const response =
            {
                count:doc.length,
                info: doc.map((docs, i) => {
                    return {
                        studentID: docs.studentID,
                        name: docs.name,
                        age:docs.age,
                        address:docs.address,
                        birthdate:docs.birthDate,
                        gender:docs.gender,
                        religion:docs.religion
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.get('/login/student/:userID/:password', (req, res, next) => {
    userID = req.params.userID;
    password = req.params.password;
    Sudent.find()
        .select('studentID age address birthDate parentnumber name gender religion classNume level')
        .where({ studentID:userID,password:password})
        .exec()
        .then(doc => {
            const response =
            {
                count:doc.length,
                info: doc.map((docs, i) => {
                    return {
                        studentID: docs.studentID,
                        name: docs.name,
                        age:docs.age,
                        address:docs.address,
                        birthdate:docs.birthDate,
                        gender:docs.gender,
                        religion:docs.religion,
                        classNum:docs.classNume,
                        level:docs.level,
                        parentNumber:docs.parentNumber
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


module.exports=router;