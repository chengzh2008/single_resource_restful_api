'use strict';

var React = require('react');
var BlogForm = require('./blog-form');
var BlogList = require('./blog-list');
var BlogAPIService = require('../apiservice/blog-service');

module.exports = React.createClass({
    loadBlogsFromServer: function () {
        BlogAPIService.get(
            function (data) {
                this.setState({data: data}); // here data is the field of the state object
            }.bind(this),
            function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this));

    },
    handleBlogSubmit: function (blog) {
        BlogAPIService.post(blog,
            function (data) {
                var blogs = this.state.data;
                var newBlogs = blogs.concat([data]);
                this.setState({
                    data: newBlogs,
                    showAddBlogForm: !this.state.showAddBlogForm
                });
            }.bind(this),
            function (xhr, status, err) {
                console.log(err);
            }.bind(this));

    },

    handleBlogRemove: function (blog) {
        BlogAPIService.delete(blog,
            function (data) {
                var blogs = this.state.data;
                var newBlogs = blogs.splice(blogs.indexOf(blog), 1);
                this.setState({data: newBlogs});
            }.bind(this),
            function (xhr, status, err) {
                console.log(err);
            }.bind(this));
    },

    handleBlogSave: function (blog, newBlog) {
        BlogAPIService.put(blog, newBlog,
            function (data) {
                var blogs = this.state.data;
                blogs[blogs.indexOf(blog)] = data;
                this.setState({data: blogs});
            }.bind(this),
            function (xhr, status, err) {
                console.log(err);
            }.bind(this));
    },

    getInitialState: function () {
        return {data: [], showAddBlogForm: false};
    },

    toggleBlogForm: function () {
        this.setState({showAddBlogForm: !this.state.showAddBlogForm})
    },

    componentDidMount: function () {
        this.loadBlogsFromServer();
        setInterval(this.loadBlogsFromServer, this.props.pollInterval)
    },

    render: function () {
        return (
            <div className="blogBox">
                <h1>My Blogs - ReactJs Front-End</h1>
                <button type='submit' className="addingBlog" onClick={this.toggleBlogForm}>New</button>
                {this.state.showAddBlogForm ? <BlogForm onBlogSubmit={this.handleBlogSubmit} /> : null}
                <BlogList data={this.state.data} onBlogRemove={this.handleBlogRemove} onBlogSave={this.handleBlogSave}/>
            </div>
        );
    }
});