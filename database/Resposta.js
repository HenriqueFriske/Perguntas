const Sequelize = require("sequelize");
const connection = require("./database");
const { FORCE } = require("sequelize/lib/index-hints");

const Resposta = connection.define("respostas",{
    corpo:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({FORCE:false});

module.exports = Resposta;