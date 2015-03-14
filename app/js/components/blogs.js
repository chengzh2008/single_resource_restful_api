'use strict';

var React = require('react');

var Blog = React.createClass({
    render: function () {
        var blog = this.props.blog;
        return (
            <div className='blog'>
                <div>
                    <label htmlFor="blog{{blog._id}}">Author: </label> {blog.author}
                </div>
                <div>
                    <label htmlFor="blogEmail">Email: </label> {blog.email}
                </div>
                <div>
                    <label htmlFor="blogBody">Content: </label>{blog.body}
                </div>
                <div>
                    <label htmlFor="blogDate">Date: </label>{blog.date}
                </div>
            </div>

        );
    }
});

module.exports = React.createClass({
    render: function () {
        var blogNodes = this.props.data.map(function (blog) {
            return (
                <Blog blog={blog} key={blog._id}></Blog>
            )
        });
        return (
            <div className="blogList">
                {blogNodes}
            </div>
        );
    }
});