'use strict';

module.exports = function(app) {
    app.controller('blogsController', ['$scope', '$http', function ($scope, $http) {
        var blogsUrl = '/api/v1/blogs';
        $scope.addingBlog = false;
        $scope.blogs = [];

        $scope.toogleAddBlog = function () {
            $scope.addingBlog = !$scope.addingBlog;
        }

        $scope.getAll = function () {
            $http({
                method: 'GET',
                url: blogsUrl
            }).success(function (data, status) {
                $scope.blogs = data;
            }).error(function (data, status) {
                console.log(data);
            });
        };

        $scope.create = function(blog) {
            $http({
                method: 'POST',
                url: blogsUrl,
                data: blog
            }).success(function(data){
                $scope.blogs.push(data);
            }).error(function (data) {
                console.log(data);
            });
        };

        $scope.save = function (blog) {
            $http({
                method: 'PUT',
                url: blogsUrl + '/' + blog._id,
                data: blog
            }).success(function (data) {
                blog.editing = false;
            }).error(function (data) {
                console.log(data);
            });
        };

        $scope.remove = function (blog) {
            $http({
                method: 'DELETE',
                url: blogsUrl + '/' + blog._id
            }).success(function () {
                $scope.blogs.splice($scope.blogs.indexOf(blog), 1);
            }).error(function (data) {
                console.log(data);
            });
        };

        $scope.toggleEdit = function (blog) {
            if(blog.editing) {
                blog = JSON.parse(JSON.stringify($scope.oldBlog));
                blog.editing = false;
            } else {
                blog.editing = true;
                $scope.oldBlog = JSON.parse(JSON.stringify(blog));
            }
        };

    }]);
};