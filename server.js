'use strict';

var express = require('express')
    , mongoose = require('mongoose')
    , blogRoutes = require('./routes/blogs_routes')
    , userRoutes = require('./routes/users_routes')
    , app = express()
    , blogRouter = express.Router()
    , userRouter = express.Router()
    , passport = require('passport')
    , passportStrategy = require('./lib/passport_strat');

module.exports = {
    startServer: function () {
        app.set('appSecret', process.env.SECRET || 'thisismyuniqueserversecret');
        mongoose.connect(process.env.MONG_URI || 'mongodb://localhost/myApp_dev');
        app.use(passport.initialize());
        passportStrategy(passport);

        userRoutes(userRouter, passport, app.get('appSecret'));
        blogRoutes(blogRouter, app.get('appSecret'));

        app.use('/api/v1', userRouter);
        app.use('/api/v1', blogRouter);

        app.listen(process.env.PORT || 3000, function () {
            console.log('Server is running on port ' + (process.env.PORT || 3000));
        });

    }
};


