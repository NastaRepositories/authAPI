const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('./User').sequelize
const User = require('./User')

const CashFlow = sequelize.define('CashFlow', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    entradaOuSaida: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    pago: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
})

CashFlow.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(CashFlow, { foreignKey: 'userId' })

module.exports = CashFlow