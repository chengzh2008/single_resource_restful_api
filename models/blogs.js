'use strict';

var mongoose = require('mongoose'),
    blogSchema = new mongoose.Schema({
        id: String,
        author: String,
        email: {type: 'String', default: 'xyz@abc.com'},
        body: String
    });

module.exports = mongoose.model('Blog', blogSchema);
