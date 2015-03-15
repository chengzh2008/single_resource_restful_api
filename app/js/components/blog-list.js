'use strict';

var React = require('react');
var Blog = require('./blog');

module.exports = React.createClass({
    handleBlogRemove: function (blog) {
        alert('about to delete the blog...');
    },

    render: function () {
        var blogNodes = this.props.data.map(function (blog) {
            return (
                <Blog blog={blog} key={blog._id}></Blog>
            )
        });
        return (
            <ul className="blogList">
                {blogNodes}
            </ul>
        );
    }
});