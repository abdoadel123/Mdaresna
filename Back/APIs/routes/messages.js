const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const messageModel = require('../Models/messageModel');

const teacherModel = require('../Models/teacherModel')

//////////////////  add message 

router.post('/addmessage', (req, res, next) => {

  var messobject = {
    _id: new mongoose.Types.ObjectId(),
    from: req.body.fromid,
    to: req.body.toid,
    messagetext: req.body.messagetext,
    seen: 0 ,
    //messageid:messageModel.find().Count()+1,
  }
  // this create an object from messagemodel and replace it's data with the new data
  const newmessage = new messageModel(messobject);
  newmessage.save()
    .then((result) => { res.status(200).end('your message added  '); })
    .catch((err) => {
      console.log(err);
      res.end('Error On Sending the  Message. ');
    });

});
///////////////// get inbox

router.get('/getinbox/:id', (req, res, next) => {

  const myid = req.params.id;
  messageModel.distinct('from')
    .where({ to: myid })
    .exec()
    .then((docs) => {
      res.status(200);
      res.json(docs);
      res.end();
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
      res.json('can not load inbox ');
      res.end();
    });
});


//////////////////////////////
router.get('/getmymessagesconversation/:myid/:from', (req, res, next) => {

  const myid = req.params.myid;
  const fromid = req.params.from;
  messageModel.find()
    .select('messagetext from to')
    .where({ to: myid  , from :fromid} )
    .exec()
    .then((docs1) => {
      messageModel.find()
        .select('messagetext from to')
        .where({to:fromid , from: myid   })
        .exec()
        .then((docs2) => {
          res.status(200);
          res.json((docs1.concat( docs2)));
          res.end();
        })
        .catch((err) => {
          res.status(500);
          console.log(err);
          res.json('can not load  messages');
          res.end();
        });
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
      res.json('can not load  messages');
      res.end();
    });
});
//////////////// teachers list 

router.get('/getteacherslist', (req, res, next) => {
  const myid = req.params.id;
  //// hnstakhdem el object el asly lan find static function we mosh m7tagin enna n3mel object gded

  teacherModel.find()
    .select('name teacherID')
    .exec()
    .then((docs) => {
      res.status(200);
      res.json(docs);
      res.end();
    })
    .catch((err) => {
      res.status(500);
      console.log(err);
      res.json('can not load teachers');
      res.end();
    });

});

module.exports = router;