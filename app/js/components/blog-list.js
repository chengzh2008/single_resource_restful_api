'use strict';

var React = require('react');
var Blog = require('./blog');

module.exports = React.createClass({
    handleBlogRemove: function (blog) {
        this.props.onBlogRemove(blog);
    },

    render: function () {
        var blogNodes = this.props.data.map(function (blog) {
            return (
                <Blog blog={blog} key={blog._id} onBlogRemove={this.handleBlogRemove}></Blog>
            )
        }.bind(this));
        return (
            <ul className="blogList">
                {blogNodes}
            </ul>
        );
    }
});