'use strict';

var Blog = require('../models/blogs'),
    bodyparser = require('body-parser');

module.exports = function (router) {
    router.use(bodyparser.json());

    router.post('/blogs', function (req, res) {
        var newblog = new Blog(req.body);
        newblog.save(function (err, blog) {
            if (err) {
                return res.status(500).send({'msg': 'Could not save a blog'});
            }
            res.json(blog);
        });
    });

    router.get('/blogs', function (req, res) {
        Blog.find({}, function (err, data) {
            if (err) {
                return res.status(500).send({'msg': 'Could not find blogs'});
            }
            res.json(data);
        });
    });

    router.put('/blogs/:id', function (req, res) {
        var updateblog = req.body;
        Blog.update({_id: req.params.id}, updateblog, function (err, result) {
            if (err) {
                return res.status(500).send({'msg': 'Could not find blogs'});
            }
            res.json(updateblog);
        });
    });

    router.delete('/blogs/:id', function (req, res) {
        Blog.remove({_id: req.params.id}, function (err, result) {
            if (err) {
                return res.status(500).send({'msg': 'Could not find blogs'});
            }
            res.json({msg: 'Your doc has been removed: ID ' + req.params.id});
        });
    });


};
