const express = require('express')
const router = express.Router()
const authenticateToken = require('../middleware/authMiddleware')

//controllers
const userController = require('../controllers/userController')
const crmController = require('../controllers/crmController.js')
const cashflowController = require('../controllers/cashflowController.js')

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

// Rotas para o Fluxo de caixa
router.get('/api/cashflow', authenticateToken, cashflowController.getAll)
router.get('/api/cashflow/paidout', authenticateToken, cashflowController.getPaidOut)
router.get('/api/cashflow/topay', authenticateToken, cashflowController.getToPay)
router.post('/api/cashflow/newpayment', authenticateToken, cashflowController.newPayment)
router.post('/api/cashflow/newreceipt', authenticateToken, cashflowController.newReceipt)
router.put('/api/cashflow/newpayment/:id', authenticateToken, cashflowController.updatePayment)
router.put('/api/cashflow/newreceipt/:id', authenticateToken, cashflowController.updateReceipt)
router.delete('/api/cashflow/deleteentry/:id', authenticateToken, cashflowController.deleteEntry)

router.get('/', authenticateToken, (req, res) => {
    res.json({ message: "Acesso autorizado à raiz" })
})
router.get('/home', authenticateToken, (req, res) => {
    res.json({ message: "Acesso autorizado ao home" })
})

module.exports = router
