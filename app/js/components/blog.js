'use strict';

var React = require('react');
var BlogEditForm = require('./blog-edit-form');


module.exports = React.createClass({
    getInitialState: function () {
        return {showEditing: false}
    },
    handleRemove: function () {
        this.props.onBlogRemove(this.props.blog);
    },

    handleEdit: function () {
        this.setState({showEditing: true});
    },
    handelCancel: function () {
      this.setState({showEditing: false});
    },

    handleSave: function (newBlog) {
        var blog = this.props.blog;
        this.props.onBlogSave(blog, newBlog);
        this.setState({showEditing: false});
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
                { this.state.showEditing ? <BlogEditForm blog={blog} onCancel={this.handelCancel} onSave={this.handleSave}/> : null }

                <button type='submit' onClick={this.handleEdit} className="editing">Edit</button>
                <button type='submit' onClick={this.handleRemove} className="remove">Delete</button>
            </li>

        );
    }
});