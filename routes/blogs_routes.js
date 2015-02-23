'use strict';

var blog = require('../models/blogs'),
    bodyparser = require('body-parser'),
    eatAuth = require('../lib/eat_auth'),
    logger = require('../lib/logger');

module.exports = function (router, appSecret) {
    router.use(bodyparser.json());

    // middleware to log the request, should be placed before those request.
    router.use(logger());

    router.post('/blogs', eatAuth(appSecret), function (req, res) {
        var newblog = new blog(req.body);
        newblog.save(function (err, blog) {
            if (err) {
                return res.status(500).send({'msg': 'Could not save a blog'});
            }
            res.json(blog);
        });
    });

    router.get('/blogs', eatAuth(appSecret), function (req, res) {
        blog.find({}, function (err, data) {
            if (err) {
                return res.status(500).send({'msg': 'Could not find blogs'});
            }
            res.json(data);
        });
    });

    router.put('/blogs/:id', eatAuth(appSecret), function (req, res) {
        var updateblog = req.body;
        blog.update({_id: req.params.id}, updateblog, function (err, result) {
            if (err) {
                return res.status(500).send({'msg': 'Could not find blogs'});
            }
            res.json(updateblog);
        });
    });

    router.delete('/blogs/:id', eatAuth(appSecret), function (req, res) {
        blog.remove({_id: req.params.id}, function (err, result) {
            if (err) {
                return res.status(500).send({'msg': 'Could not find blogs'});
            }
            res.json({msg: 'Your doc has been removed: ID ' + req.params.id});
        });
    });


};
