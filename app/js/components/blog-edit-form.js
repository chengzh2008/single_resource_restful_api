'use strict';

var React = require('react');

module.exports = React.createClass({
    handleSave: function (e) {
        e.preventDefault();
        var newBlog = this.state.newBlog;
        newBlog.author = React.findDOMNode(this.refs.author).value.trim();
        newBlog.email = React.findDOMNode(this.refs.email).value.trim();
        newBlog.body = React.findDOMNode(this.refs.body).value.trim();
        if (!newBlog.author || !newBlog.email || !newBlog.body) {
            return;
        }
        this.props.onSave(newBlog);
    },

    getInitialState: function () {
        return {newBlog: JSON.parse(JSON.stringify(this.props.blog))};
    },

    handleCancel: function (e) {
        e.preventDefault();
        this.props.onCancel();
    },

    render: function () {
        var newBlog = this.state.newBlog;
        return (
            <form className="blogForm">
                <div>
                    <label htmlFor="newBlog{{newBlog._id}}">Author: </label>
                    <input type="text" defaultValue={newBlog.author} ref="author"/>
                </div>
                <div>
                    <label htmlFor="blogEmail">Email: </label>
                    <input type="text" defaultValue={newBlog.email} ref="email"/>
                </div>
                <div>
                    <label htmlFor="blogBody">Content: </label>
                    <textarea type="text" defaultValue={newBlog.body} ref="body"></textarea>
                </div>
                <button type="submit" className="save" onClick={this.handleSave}>Save</button>
                <button type="submit" className="cancel" onClick={this.handleCancel}>Cancel</button>
            </form>
        );
    }
});