'use strict';

var ajax = require('jquery').ajax;
var baseUrl = '/api/v1/blogs';

module.exports = {

    get: function (success, error) {
        ajax({
            url: baseUrl,
            dataType: 'json',
            success: success,
            error: error
        });
    },

    post: function (blog, success, error) {
        ajax({
            url: baseUrl,
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify(blog),
            success: success,
            error: error
        });
    },

    delete: function (blog, success, error) {
        ajax({
            url: baseUrl + '/' + blog._id,
            contentType: 'application/json',
            method: 'DELETE',
            data: JSON.stringify(blog),
            success: success,
            error: error
        });
    },

    put: function (blog, newBlog, success, error) {
        ajax({
            url: baseUrl + '/' + newBlog._id,
            contentType: 'application/json',
            method: 'PUT',
            data: JSON.stringify(newBlog),
            success: success,
            error: error
        });
    }
};

