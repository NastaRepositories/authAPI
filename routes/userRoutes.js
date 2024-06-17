const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authenticateToken = require('../middleware/authMiddleware')

// Rotas de Login e Auth
router.post('/register', userController.register)
router.post('/auth', userController.auth)
router.post('/logout', authenticateToken, userController.logout)
router.put('/update', authenticateToken, userController.update)


router.get('/', authenticateToken, (req, res) => {
    res.json({ message: "Acesso autorizado à raiz" })
})
router.get('/home', authenticateToken, (req, res) => {
    res.json({ message: "Acesso autorizado ao home" })
})

module.exports = router
