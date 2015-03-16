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

    toggleEditForm: function () {
        this.setState({showEditing: !this.state.showEditing});
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
            {!this.state.showEditing ?
                <div>
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
                : null}
                { this.state.showEditing ? <BlogEditForm blog={blog} onCancel={this.toggleEditForm} onSave={this.handleSave}/> : null }

                <button type='submit' onClick={this.toggleEditForm} className="editing">Edit</button>
                <button type='submit' onClick={this.handleRemove} className="remove">Delete</button>
            </li>

        );
    }
});