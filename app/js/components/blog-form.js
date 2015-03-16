'use strict';

var React = require('react');

module.exports = React.createClass({
    handleSubmit: function (e) {
        e.preventDefault();
        var newBlog = {
            author: React.findDOMNode(this.refs.author).value.trim(),
            email: React.findDOMNode(this.refs.email).value.trim(),
            body: React.findDOMNode(this.refs.body).value.trim()
        };
        if (!newBlog.author || !newBlog.email || !newBlog.body) {
            return;
        }
        this.props.onBlogSubmit(newBlog);
        React.findDOMNode(this.refs.author).value = '';
        React.findDOMNode(this.refs.email).value = '';
        React.findDOMNode(this.refs.body).value = '';

        return;
    },

    render: function () {
        return (
            <form className="blogForm" onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="blog{{blog._id}}">Author: </label>
                    <input type="text" placeholder="Your name" ref="author" />
                </div>
                <div>
                    <label htmlFor="blogEmail">Email: </label>
                    <input type="text" placeholder="You email" ref="email"/>
                </div>
                <div>
                    <label htmlFor="blogBody">Content: </label>
                    <textarea type="text" placeholder="Your blog" ref="body"></textarea>
                </div>
                <button type="submit" value="Post" className="addingBlog">Post</button>
            </form>
        );
    }
});