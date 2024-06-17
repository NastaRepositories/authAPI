const express = require('express')
const router = express.Router()
const authenticateToken = require('../middleware/authMiddleware')

//controllers
const userController = require('../controllers/userController')
const crmController = require('../controllers/crmController.js')

// Rotas de Login e Auth
router.post('/api/auth/register', userController.register)
router.post('/api/auth/login', userController.auth)
router.post('/api/auth/logout', authenticateToken, userController.logout)
router.put('/api/auth/update', authenticateToken, userController.update)

// Rotas para CRUD de clientes
router.get('/api/crm', authenticateToken, crmController.getAll)
router.post('/api/crm', authenticateToken, crmController.create)
router.put('/api/crm/:id', authenticateToken, crmController.update)
router.delete('/api/crm/:id', authenticateToken, crmController.delete)

router.get('/', authenticateToken, (req, res) => {
    res.json({ message: "Acesso autorizado à raiz" })
})
router.get('/home', authenticateToken, (req, res) => {
    res.json({ message: "Acesso autorizado ao home" })
})

module.exports = router