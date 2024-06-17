const { Sequelize } = require('sequelize')
const Crm = require('../models/Crm')
const User = require('../models/User')

exports.getAll = async(req,res) => {

    try{

        const userId = req.user.id
        const crmEntries = await Crm.findAll({ where: { userId } })
        res.json(crmEntries)

    }

    catch(error){

        res.status(500).json(
            {
                error: "Erro ao buscar cadastros no CRM"
            }
        )

    }

}

exports.create = async(req,res) => {

    const { nome, telefone, email, cpfCnpj } = req.body
    const userId = req.user.id

    try {

        const newCrmEntry = await Crm.create(
            {
                nome,
                telefone,
                email,
                cpfCnpj,
                userId,
                ultimaModificacao: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        )

        res.status(201).json(newCrmEntry)

    }

    catch(error) {

        res.status(500).json(
            {
                error: error
            }
        ) 

    }

}

exports.update = async(req,res) => {

    const { id } = req.params
    const { nome, telefone, email, cpfCnpj } = req.body

    try {

        const crmEntry = await Crm.findByPk(id)
        if ( !crmEntry || crmEntry.userId !== req.user.id ) {

            return res.status(400).json(
                {
                    erro: "Cadastro não encontrado no CRM"
                }
            )

        }

        crmEntry.nome = nome || crmEntry.nome
        crmEntry.telefone = telefone || crmEntry.telefone
        crmEntry.email = email || crmEntry.email
        crmEntry.cpfCnpj = cpfCnpj || crmEntry.cpfCnpj
        crmEntry.ultimaModificacao = Sequelize.literal('CURRENT_TIMESTAMP')

        await crmEntry.save()
        res.json(crmEntry)

    }

    catch(error) {

        res.status(500).json(
            {
                error: "Erro ao atualizar no CRM"
            }
        ) 

    }

}

exports.delete = async(req, res) => {

    const { id } = req.params

    try {

        const crmEntry = await Crm.findByPk(id)
        if ( !crmEntry || crmEntry.userId !== req.user.id ) {

            return res.status(400).json(
                {
                    erro: "Cadastro não encontrado no CRM"
                }
            )

        }

        await crmEntry.destroy()
        res.status(201).json(
            {
                Message: "Cadastro deletado do CRM"
            }
        )

    }

    catch(error) {

        res.status(500).json(
            {
                error: "Erro ao deletar do CRM"
            }
        ) 

    }

}