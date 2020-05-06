const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const feedbackModel = require('../Models/feedbackModel');

const Note = require('../Models/noteModel');
const Attend = require('../Models/attendModel');
const Level = require('../Models/levels');
const Sudent = require('../Models/studentModel');
const homeworkModel = require('../Models/homeworkModel');
const teacherModel = require('../Models/teacherModel');
const Notification = require('../Models/notificationModel')
const gradeModel = require('../Models/gradeModel');


router.post('/addfeedback', (req, res, next) => {
    var f = {
        _id: new mongoose.Types.ObjectId(),
        t_id: req.body.teacherID,
        s_id: req.body.studentID,
        subject: req.body.subject,
        feedback: req.body.feedback,
        date: '12/12/2012'
    }
    const newfeedback = new feedbackModel(f);
    newfeedback.save()
        .then((result) => {
            console.log(result);
            res.status(200);
            res.json('the feedback is added . ').end();
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
            res.json('can not add new feedback . '), end();
        });

});
/////////////////////////////////////////////////////////////////////////////////////

////Add Attend
router.post('/absent', (req, res, next) => {
    const attend = new Attend({
        _id: new mongoose.Types.ObjectId(),
        studentID: req.body.studentID,
        subjectName: req.body.subject,
        absent: req.body.absent,
    });
    attend
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

/////// home 

router.get('/home/:sid', (req, res, next) => {
    const studentid = req.params.sid;
    teacherModel.find()
        .select('name')
        .where({ teacherID: studentid })
        .exec()
        .then((docs) => {
            res.status(200);
            res.json(docs);
            res.end();
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
            res.json('can not get student Informations .');
        });
});

//Add Note
router.post('/note/add/', (req, res, next) => {
    const note = new Note({
        _id: new mongoose.Types.ObjectId(),
        studentID: req.body.studentID,
        teacherID: req.body.teacherID,
        note: req.body.note,
        subject: req.body.subject
    });
    note
        .save()
        .then(result => {
            console.log("ok")
            res.status(200).json({
                message: 'Note Add Succefully',
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//Get Subject
router.get('/subject/:teacherID/:level/:class', (req, res, next) => {
    teacherID = req.params.teacherID;
    level = req.params.level,
        clas = req.params.class
    Level.find()
        .select('subject')
        .where({ teacherID: teacherID, level: level, class: clas })
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

//Get Level & Class

router.get('/levelsClasses/:teacherID', (req, res, next) => {
    teacherID = req.params.teacherID;
    Level.find()
        .select('level class')
        .where({ teacherID: teacherID })
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

//Get Student
router.get('/getStud/:level/:classNum', (req, res, next) => {
    level = req.params.level;
    classNum = req.params.classNum;
    Sudent.find()
        .select('studentID name')
        .where({ level: level, classNume: classNum })
        .exec()
        .then(doc => {
            const response =
                {
                    info: doc.map((docs, i) => {
                        return {
                            studentID: docs.studentID,
                            name: docs.name,
                            key: i,
                            check: false
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

///////////////////////////    get feedback history

router.get('/geteedback/:studentID/:teacherID', (req, res, next) => {
    const studentID = req.params.studentID;
    const teacherID = req.params.teacherID;
    feedbackModel.find()
        .select('feedback subject')
        .where({ s_id: studentID, t_id: teacherID })
        .exec()
        .then((docs) => {
            const result = {
                count: docs.length,
                feedbacks: docs.map((doc) => {
                    return { subject: doc.subject, feedback: doc.feedback };
                })
            }
            res.status(200);
            res.json(result);
            res.end();
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
            res.json('can not get student feedback .');
        });
});

//Show Note
router.get('/note/show/:studentID/:teacherID', (req, res, next) => {
    const studID = req.params.studentID;
    const teachID = req.params.teacherID;
    Note.find()
        .select('note subject')
        .where({ studentID: studID, teacherID: teachID })
        .exec()
        .then(doc => {
            const response =
                {
                    count: doc.length,
                    notes: doc.map(docs => {
                        return {
                            note: docs.note,
                            subject: docs.subject
                        }
                    })
                };
            res.status(200).json(response).end();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});
//Add NotiFication

router.post('/notification', (req, res, next) => {
    var f = {
        _id: new mongoose.Types.ObjectId(),
        level: req.body.level,
        class: req.body.class,
        description: req.body.description,
    }
    const newNoti = new Notification(f);
    newNoti.save()
        .then((result) => {
            console.log(result);
            res.status(200);
            res.json('the feedback is added . ');
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
            res.json('can not add new feedback . ');
        });

});

//Update Attendance
router.patch('/attend/update/', (req, res, next) => {
    const id = req.body.studID;
    const subName = req.body.subject;
    Attend
        .update({ studentID: id, subjectName: subName }, { $inc: { absent: 1 } })
        .exec()
        .then(doc => {
            consol.log('ok');
            res.status(200).json({
                message: 'Attend updated',
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });;
});

/////////////////////////////////  today 

// add new homework 

router.post('/homeworks', (req, res, next) => {
    var task = {
        _id: new mongoose.Types.ObjectId(),

        level: req.body.level,
        class: req.body.classnum,
        subject: '',
        date: '4/7/2018',
        task: req.body.task
    }
    teacherid = req.body.teacherid;
    Level.find()
        .select('subject')
        .where({ level: task.level, class: task.class, teacherID: teacherid })
        .exec()
        .then((docs) => {
            if (docs.length >= 1) {
                task.subject = docs[0].subject;
                const newhomework = new homeworkModel(task);
                newhomework.save()
                    .then((result) => {
                        res.status(200);
                        res.end();
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500);
                        res.json('can not add the taske . ');
                        res.end();
                    });

            }
            else {
                res.status(500);
                res.end();
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
            res.end();
        });


});

/// add grade 

router.post('/grades', (req, res, next) => {
    grade = {
        _id: new mongoose.Types.ObjectId(),

        studentid: req.body.studentid,
        subject: req.body.subject,
        grade: req.body.grade,
        description: req.body.description
    }

    teacherid = req.body.teacherid;
    Level.find()
        .select('teacherID')
        .where({ level: req.body.level, class: req.body.classnumber, subject: grade.subject })
        .exec()
        .then((docs) => {

            if (docs[0].teacherID === teacherid) {
                //res.json(teacherid).end();
                const newgrade = new gradeModel(grade);
                newgrade.save()
                    .then((result) => {
                        res.status(200);
                        res.json('added . ');
                        res.end();
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500);
                        res.json('can not add the grade ');
                        res.end();
                    });

            }
            else {
                res.status(500);
                res.json('can not add the grade You don not have access else . ');
                res.end();
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
            res.end();
        });


});


//////////////////////////////////////////////////////////////////////// 
module.exports = router;