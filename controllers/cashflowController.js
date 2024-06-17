const CashFlow = require('../models/CashFlow')
const { Sequelize } = require('sequelize')

exports.getAll = async (req, res) => {

    try {

        const userId = req.user.id
        const cashFlowEntries = await CashFlow.findAll({ where: { userId } })
        res.json(cashFlowEntries)

    }
    
    catch (error) {

        res.status(500).json(
            {
                error: 'Erro ao buscar transações do fluxo de caixa'
            }
        )
    }
}

exports.getPaidOut = async (req, res) => {

    try {

        const userId = req.user.id
        const paidOutEntries = await CashFlow.findAll({ where: { userId, pago: true } })
        res.json(paidOutEntries)

    }
    
    catch (error) {

        res.status(500).json(
            { 
                error: 'Erro ao buscar transações pagas' 
            }
        )
    }
}

exports.getToPay = async (req, res) => {

    try {

        const userId = req.user.id
        const toPayEntries = await CashFlow.findAll({ where: { userId, pago: false } })
        res.json(toPayEntries)

    }
    
    catch (error) {

        res.status(500).json(
            { 
                error: 'Erro ao buscar transações a pagar' 
            }
        )
    }
}

exports.newPayment = async (req, res) => {

    const { nome, data, valor, pago = false } = req.body
    const userId = req.user.id

    try {

        const newPayment = await CashFlow.create({
            nome,
            data,
            valor,
            pago,
            entradaOuSaida: false,
            userId
        })
        res.status(201).json(newPayment)

    }
    
    catch (error) {

        res.status(500).json(
            {
                error: 'Erro ao criar nova conta a pagar'
            }
        )
    }
}

exports.newReceipt = async (req, res) => {

    const { nome, data, valor, pago = false } = req.body
    const userId = req.user.id

    try {

        const newReceipt = await CashFlow.create({
            nome,
            data,
            valor,
            pago,
            entradaOuSaida: true,
            userId
        })
        res.status(201).json(newReceipt)

    }
    
    catch (error) {

        res.status(500).json(
            { 
                error: 'Erro ao criar nova conta a receber' 
            }
        )
    }
}

exports.updatePayment = async (req, res) => {

    const { id } = req.params
    const { nome, data, valor, pago } = req.body

    try {

        const payment = await CashFlow.findByPk(id)

        if (!payment || payment.userId !== req.user.id || payment.entradaOuSaida !== false) {
            return res.status(404).json({ error: 'Conta a pagar não encontrada' })
        }

        payment.nome = nome || payment.nome
        payment.data = data || payment.data
        payment.valor = valor || payment.valor
        payment.pago = pago !== undefined ? pago : payment.pago

        await payment.save()

        res.json(payment)

    }
    
    catch (error) {

        res.status(500).json(
            { 
                error: 'Erro ao atualizar conta a pagar' 
            }
        )
    }
}

exports.updateReceipt = async (req, res) => {

    const { id } = req.params
    const { nome, data, valor, pago } = req.body

    try {

        const receipt = await CashFlow.findByPk(id)

        if (!receipt || receipt.userId !== req.user.id || receipt.entradaOuSaida !== true) {
            return res.status(404).json({ error: 'Conta a receber não encontrada' })
        }

        receipt.nome = nome || receipt.nome
        receipt.data = data || receipt.data
        receipt.valor = valor || receipt.valor
        receipt.pago = pago !== undefined ? pago : receipt.pago

        await receipt.save()

        res.json(receipt)

    }
    
    catch (error) {

        res.status(500).json(
            { 
                error: 'Erro ao atualizar conta a receber' 
            }
        )
    }
}

exports.deleteEntry = async (req, res) => {

    const { id } = req.params

    try {

        const entry = await CashFlow.findByPk(id)

        if (!entry || entry.userId !== req.user.id) {
            return res.status(404).json({ error: 'Entrada não encontrada' })
        }

        await entry.destroy()
        res.json(
            { 
                message: 'Entrada deletada com sucesso' 
            }
        )

    }
    
    catch (error) {

        res.status(500).json(
            { 
                error: 'Erro ao deletar entrada' 
            }
        )
    }
}