'use strict';

var React = require('react');
var ajax = require('jquery').ajax;
var Blog = require('./components/blog');

var BlogBox = React.createClass({
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
                <BlogList data={this.state.data}/>
            </div>
        );
    }
});



var BlogForm = React.createClass({
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
        console.log(newBlog);
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
                <input type="submit" value="Post" />
            </form>
        );
    }
});


var BlogList = React.createClass({
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



React.render(
    <BlogBox url='/api/v1/blogs' pollInterval={2000} />,
    document.getElementById('blog')
);