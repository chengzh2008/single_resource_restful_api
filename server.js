'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    userRouter = require('./routes/blogs_routes'),
    app = express(),
    router = express.Router();

module.exports = {
    startServer: function () {
        mongoose.connect(process.env.MONG_URI || 'mongodb://localhost/myApp_dev');
        userRouter(router);

        app.use('/api/v1', router);

        app.listen(process.env.PORT || 3000, function () {
            console.log('Server is running on port ' + (process.env.PORT || 3000));
        });

    }
};


