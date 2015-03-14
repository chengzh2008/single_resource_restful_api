'use strict';

var mongoose = require('mongoose'),
    blogSchema = new mongoose.Schema({
        author: String,
        email: {type: 'String', default: 'xyz@abc.com'},
        body: String,
        date: {type: 'Date', default: new Date()}
    });

module.exports = mongoose.model('Blog', blogSchema);
