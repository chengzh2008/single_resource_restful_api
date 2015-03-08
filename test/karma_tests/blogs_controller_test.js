'use strict';

var randomBlog = require('../../lib/randomDataGenerator');
require('../../app/js/client');
require('angular-mocks');

describe('blogs controller', function () {
    var $ControllerConstructor;
    var $httpBackend;
    var $scope;
    var requestUrl = '/api/v1/blogs';

    beforeEach(angular.mock.module('blogsApp'));

    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        $ControllerConstructor = $controller;
    }));

    it('should be able to create a controller', function () {
        var blogsController = $ControllerConstructor('blogsController', {$scope: $scope});
        expect(typeof blogsController).toBe('object');
        expect(Array.isArray($scope.blogs)).toBe(true);
    });

    describe('REST request from angular controller', function () {
        beforeEach(angular.mock.inject(function ($rootScope, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $scope = $rootScope.$new();
            $ControllerConstructor('blogsController', {$scope: $scope});
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should get all the blogs', function () {
            var blogA = randomBlog.getRandomBlog();
            $httpBackend.expectGET(requestUrl).respond(200, [blogA]);

            $scope.getAll();
            $httpBackend.flush();

            expect($scope.blogs[0]).toEqual(blogA);
        });

        it('should be able to save the blog', function () {
            var blogA = randomBlog.getRandomBlog();
            $httpBackend.expectPOST(requestUrl).respond(200, blogA);

            $scope.create(blogA);
            $httpBackend.flush();

            expect($scope.blogs[0]).toEqual(blogA);
        });

        it('should be able to save the blog changes', function () {
            var updatedBlogA = randomBlog.getRandomBlog();
            updatedBlogA._id = 1;
            $httpBackend.expectPUT(requestUrl + '/' + 1).respond(200);

            $scope.save(updatedBlogA);
            $httpBackend.flush();

            expect(updatedBlogA.editing).toBe(false);
        });

        it('should be able to delete the note', function () {
            var blogA = randomBlog.getRandomBlog();
            blogA._id = 1;
            blogA.editing = true;
            $httpBackend.expectDELETE(requestUrl + '/' + blogA._id).respond(200);

            $scope.blogs.push(blogA);
            $scope.remove(blogA);
            $httpBackend.flush();

            expect($scope.blogs.length).toBe(0);
        });
    });


});