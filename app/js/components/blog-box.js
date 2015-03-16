'use strict';

var React = require('react');
var ajax = require('jquery').ajax;
var BlogForm = require('./blog-form');
var BlogList = require('./blog-list');

module.exports = React.createClass({
    loadBlogsFromServer: function () {
        ajax({
            url: this.props.url,
            dataType: 'json',
            success: function (data) {
                this.setState({data: data}); // here data is the field of the state object
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleBlogSubmit: function (blog) {
        ajax({
            url: this.props.url,
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify(blog),
            success: function (data) {
                console.log('after saving to database...', data);
                var blogs = this.state.data;
                var newBlogs = blogs.concat([data]);
                this.setState({data: newBlogs});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }.bind(this)
        });
    },
    handleBlogRemove: function (blog) {
        ajax({
            url: this.props.url + '/' + blog._id,
            contentType: 'application/json',
            method: 'DELETE',
            data: JSON.stringify(blog),
            success: function (data) {
                console.log('after saving to database...', data);
                var blogs = this.state.data;
                var newBlogs = blogs.splice(blogs.indexOf(blog), 1);
                this.setState({data: newBlogs});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }.bind(this)
        });
    },

    handleBlogSave: function (blog, newBlog) {
        ajax({
            url: this.props.url  + '/' + newBlog._id,
            contentType: 'application/json',
            method: 'PUT',
            data: JSON.stringify(newBlog),
            success: function (data) {
                var blogs = this.state.data;
                blogs[blogs.indexOf(blog)] = data;
                this.setState({data: blogs});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(err);
            }.bind(this)
        });
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