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
        beforeEach(angular.mock.inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should get all the blogs', function () {
            var blogA = randomBlog.getRandomBlog();
            $httpBackend.expectGET(requestUrl).respond(200, [blogA]);

        var blogsConroller = $ControllerConstructor('blogsController', {$scope: $scope});
            $scope.getAll();
            $httpBackend.flush();

            expect($scope.blogs[0]).toEqual(blogA);
        });
    });


});