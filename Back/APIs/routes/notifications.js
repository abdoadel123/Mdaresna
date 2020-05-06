const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const notificationModel = require('../Models/notificationModel');

router.get('/:myid', (req, res, next) => {
    myid = req.params.myid
    notificationModel.find()
        .select('notification')
        .where({ to: myid })
        .exec()
        .then((docs1) => {

            notificationModel.find()
                .select('notification')
                .where({ to: "0" })
                .exec()
                .then((docs2) => {
                    res.status(200);
                    res.json(docs1.concat(docs2));
                    res.end();
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500);
                    res.end();
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
            res.end();
        });
});


// add notification  

router.post('/', (req, res, next) => {
    var n = {
        to: req.body.id,
        notification: req.body.notification
    }
    
    const notification = new notificationModel(n);
    notification.save()
        .then((result) => {
            res.status(200);
            res.end();
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
            res.json('can not add the notification . ');
            res.end();
        });


});

module.exports = router;