'use strict';
process.env.MONG_URI = 'mongodb://localhost/myApp_test';
require('../index');

var chai = require('chai'),
    chaihttp = require('chai-http'),
    expect = chai.expect,
    Chance = require('chance'),
    chance = new Chance(),
    serverUrl = 'localhost:3000/api/v1',
    mongoose = require('mongoose');


chai.use(chaihttp);

function getRandomblogObject() {
    return {
        id: chance.string(50),
        author: chance.string(10),
        email: chance.string(10) + '@' + chance.string(5) + '.com',
        body: chance.string(200)
    };
}


function getRandomUser() {
    return {
        email: chance.string(10) + '@' + chance.string(5) + '.com',
        password: chance.string(30),
        username: chance.string(50)
    }
}

describe('blogs api end points', function () {
    var token,
        blogA = getRandomblogObject(),
        blogDefault = {
            id: chance.string(50),
            author: chance.string(10),
            body: chance.string(200)
        },

        blogB = getRandomblogObject(),
        blogC = getRandomblogObject(),
        blogD = getRandomblogObject(),
        blogE = getRandomblogObject(),

        userA = getRandomUser(),
        userB = getRandomUser();


    before(function(done) {
        chai.request(serverUrl)
            .post('/create_user')
            .send(userA)
            .end(function(err, res) {
                token = res.body.token;
                done();
            });
    });


    after(function (done) {
        mongoose.connection.db.dropDatabase(function () {
            done();
        });
    });

    it('should create a user and return a token', function (done) {
        chai.request(serverUrl)
            .post('/create_user')
            .send(userB)
            .end(function (err, res) {
                expect(err).to.eql(null);
                expect(res.body).to.have.property('token');
                done();
            })
    })

    it('should respond to a post request', function (done) {
        chai.request(serverUrl)
            .post('/blogs')
            .send(blogA)
            .set('token', token)
            .end(function (err, res) {
                console.log(res.body);
                expect(err).to.eql(null);
                expect(res.body.id).to.eql(blogA.id);
                expect(res.body.author).to.eql(blogA.author);
                expect(res.body.email).to.eql(blogA.email);
                expect(res.body.body).to.eql(blogA.body);
                done();
            });
    });

    it('should respond to a get request', function (done) {
        chai.request(serverUrl)
            .get('/blogs')
            .send()
            .set('token', token)
            .end(function (err, res) {
                console.log(res.body);
                expect(err).to.eql(null);
                var returnedBlog = res.body[0];
                delete returnedBlog._id;
                delete returnedBlog.__v;
                expect(returnedBlog).to.eql(blogA);
                done();
            });
    });

    it('should not respond to a get request', function (done) {
        chai.request(serverUrl)
            .get('/blogs')
            .send()
            .end(function (err, res) {
                console.log(res.body);
                expect(err).to.eql(null);
                expect(res.body.msg).to.eql("could not authenticate");
                done();
            });
    });

    describe('delete test without and with token', function() {
        var id;
        before(function (done) {
            chai.request(serverUrl)
                .post('/blogs')
                .send(blogC)
                .set('token', token)
                .end(function(err, res) {
                    id = res.body._id;
                    console.log(id);
                    done();
                })
        });

        it('should not respond to a delete request without token', function (done) {
            chai.request(serverUrl)
                .delete('/blogs/' + id)
                .send()
                .end(function (err, res) {
                    console.log(res.body);
                    expect(err).to.eql(null);
                    expect(res.body.msg).to.eql("could not authenticate");
                    done();
                });
        });

        it('should get to the blogA', function (done) {
            chai.request(serverUrl)
                .get('/blogs')
                .send()
                .set('token', token)
                .end(function (err, res) {
                    console.log(res.body);
                    expect(err).to.eql(null);
                    var returnedBlog = res.body[1];
                    delete returnedBlog._id;
                    delete returnedBlog.__v;
                    expect(returnedBlog).to.eql(blogC);
                    done();
                });
        });

        it('should get 2 blogs', function (done) {
            chai.request(serverUrl)
                .get('/blogs')
                .send()
                .set('token', token)
                .end(function (err, res) {
                    console.log(res.body);
                    expect(err).to.eql(null);
                    expect(res.body.length).to.eql(2);
                    done();
                });
        });

        it('should respond to a delete request with token', function (done) {
            chai.request(serverUrl)
                .delete('/blogs/' + id)
                .send()
                .set('token', token)
                .end(function (err, res) {
                    console.log(res.body);
                    expect(err).to.eql(null);
                    expect(res.body.msg).to.eql("Your doc has been removed: ID " + id);
                    done();
                });
        });

        it('should get 1 blog after delete request', function (done) {
            chai.request(serverUrl)
                .get('/blogs')
                .send()
                .set('token', token)
                .end(function (err, res) {
                    console.log(res.body);
                    expect(err).to.eql(null);
                    expect(res.body.length).to.eql(1);
                    done();
                });
        });
    });



});
