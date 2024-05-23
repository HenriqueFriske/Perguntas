const Sequelize = require("sequelize");
const connection = require("./database");
const { FORCE } = require("sequelize/lib/index-hints");

const Pergunta = connection.define('pergunta',{
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force:false}).then(()=>{}); //se a tabela ja existe ele n vai forçar a criaçao dela

module.exports = Pergunta;