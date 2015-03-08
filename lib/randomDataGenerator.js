'use strict';
var Chance = require('chance'),
    chance = new Chance();

module.exports = {
    getRandomBlog: function () {
        return {
            author: chance.string(10),
            email: chance.string(10) + '@' + chance.string(5) + '.com',
            body: chance.string(200),
            date: new Date().toJSON(),
        };

    }
}
