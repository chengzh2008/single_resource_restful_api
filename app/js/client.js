'use strict';

var React = require('react');
var BlogBox = require('./components/blog-box');

React.render(
    <BlogBox url='/api/v1/blogs' pollInterval={2000} />,
    document.getElementById('blog')
);