const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('./User').sequelize
const User = require('./User')

const Crm = sequelize.define('Crm', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cpfCnpj: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dataCadastro: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    ultimaModificacao: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
})

Crm.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Crm, { foreignKey: 'userId' })

module.exports = Crm