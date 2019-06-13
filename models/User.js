const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('users',{
    username: {
        type: Sequelize.STRING
    },
    googleId: {
        type: Sequelize.STRING
    }
})
User.sync()
module.exports = User