const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(process.env.DATABASE_URL)

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    lastToken: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    timestamps: false
})

module.exports = User
