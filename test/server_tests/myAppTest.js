'use strict';
/*jshint expr: true*/

process.env.MONG_URI = 'mongodb://localhost/myApp_test';
require('../../index');

var chai = require('chai'),
    chaihttp = require('chai-http'),
    expect = chai.expect,
    serverUrl = 'localhost:3000/api/v1',
    mongoose = require('mongoose'),
    Chance = require('chance'),
    chance = new Chance(),
    randomDataGenerator = require('../../lib/randomDataGenerator');


chai.use(chaihttp);


describe('blogs api end points', function () {
    var blogA = randomDataGenerator.getRandomBlog(),
        blogDefault = {
            author: chance.string(10),
            body: chance.string(200)
        },

        blogB = randomDataGenerator.getRandomBlog(),
        blogC = randomDataGenerator.getRandomBlog();


    afterEach(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            done();
        });
    });

    it('should respond to a post request', function (done) {
        chai.request(serverUrl)
            .post('/blogs')
            .send(blogA)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.author).to.eql(blogA.author);
                expect(res.body.email).to.eql(blogA.email);
                expect(res.body.body).to.eql(blogA.body);
                done();
            });
    });

    it('should have a default email', function (done) {
        chai.request(serverUrl)
            .post('/blogs')
            .send(blogDefault)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body.author).to.eql(blogDefault.author);
                expect(res.body.email).to.eql('xyz@abc.com');

                done();
            });
    });

    describe('already has a data in database', function () {
        var id;
        beforeEach(function (done) {
            chai.request(serverUrl)
                .post('/blogs')
                .send(blogB)
                .end(function (err, res) {
                    id = res.body._id;
                    done();
                });
        });

        it('should have an index', function (done) {
            chai.request(serverUrl)
                .get('/blogs')
                .end(function (err, res) {
                    expect(err).to.eql(null);
                    expect(Array.isArray(res.body)).to.be.true;
                    var returnedBlog = res.body[0];
                    delete returnedBlog._id;
                    delete returnedBlog.__v;
                    expect(returnedBlog).to.deep.eql(blogB);
                    done();
                });
        });

        it('should update the blog', function (done) {
            blogC._id = id;
            chai.request(serverUrl)
                .put('/blogs/' + id)
                .send(blogC)
                .end(function (err, res) {
                    expect(err).to.eql(null);
                    expect(res.body).to.deep.eql(blogC);
                    done();
                });
        });


    });

    describe('test delete request', function () {
        var id;
        beforeEach(function (done) {
            chai.request(serverUrl)
                .post('/blogs')
                .send(blogB)
                .end(function (err, res) {
                    id = res.body._id;
                    done();
                });
        });

        it('should delete the blog', function (done) {
            chai.request(serverUrl)
                .delete('/blogs/' + id)
                .end(function (err, res) {
                    expect(err).to.eql(null);
                    expect(res.body.msg).to.eql('Your doc has been removed: ID ' + id);
                    done();
                });
        });

    });


});
