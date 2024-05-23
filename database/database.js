const Sequelize  = require("sequelize");

const connection = new Sequelize('guiaperguntas', 'root', '96972389',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;