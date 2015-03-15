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
        console.log('before ajax call...', blog);
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
      alert('inside the blog box...');
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
    getInitialState: function () {
        return {data: []};
    },

    componentDidMount: function () {
        this.loadBlogsFromServer();
        setInterval(this.loadBlogsFromServer, this.props.pollInterval)
    },
    render: function () {
        return (
            <div className="blogBox">
                <h1>My Blogs</h1>
                <BlogForm onBlogSubmit={this.handleBlogSubmit} />
                <BlogList data={this.state.data} onBlogRemove={this.handleBlogRemove}/>
            </div>
        );
    }
});