const Sequelize = require('sequelize')
const keys = require('./auth.json')

// console.log(keys.facebook.teste)

const sequelize = new Sequelize(
    keys.mysql.db,
    keys.mysql.user,
    keys.mysql.pass,
    {
        host: keys.mysql.host,
        dialect: 'mysql'
    }
);

sequelize.authenticate().then( () => {
    console.log("conectado ao db com sucesso");
}).catch((erro) => {
    console.log("Falha ao conectar com o db(teste) " + erro);
});

module.exports = sequelize;