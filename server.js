require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./models/User').sequelize

const app = express()
app.use(bodyParser.json())

// Importar rotas
const userRoutes = require('./routes/userRoutes')
app.use(userRoutes)

// Sincronizar banco de dados
sequelize.sync().then(() => {
    console.log('Database Conected')
}).catch((err) => {
    console.error('Unable to connect to the database:', err)
})

// Iniciar o servidor
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
