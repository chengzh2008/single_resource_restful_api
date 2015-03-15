'use strict';

var React = require('react');

module.exports = React.createClass({
    handleRemove: function () {
        alert('about to delete...');
        this.props.onBlogRemove(this.props.blog);
    },

    render: function () {
        var blog = this.props.blog;
        return (
            <li className='blog'>
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
                <button type='submit' onClick={this.handleRemove} className="remove">Delete</button>
            </li>

        );
    }
});