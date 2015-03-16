'use strict';

var React = require('react');
var Blog = require('./blog');

module.exports = React.createClass({
    handleBlogRemove: function (blog) {
        this.props.onBlogRemove(blog);
    },
    handleBlogSave: function (blog, newBlog) {
        this.props.onBlogSave(blog, newBlog);
    },

    render: function () {
        var blogNodes = this.props.data.map(function (blog) {
            return (
                <Blog blog={blog} key={blog._id} onBlogRemove={this.handleBlogRemove} onBlogSave={this.handleBlogSave}></Blog>
            )
        }.bind(this));
        return (
            <ul className="blogList">
                {blogNodes}
            </ul>
        );
    }
});