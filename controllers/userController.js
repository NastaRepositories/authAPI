const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.register = async (req, res) => {
    const { nome, email, senha, senhaRepetida } = req.body

    if (senha !== senhaRepetida) {
        return res.status(400).json(
            { 
                error: "As senhas não coincidem" 
            }
        )
    }

    const hashedPassword = await bcrypt.hash(senha, 10)

    try {
        const user = await User.create({
            nome,
            email,
            senha: hashedPassword
        })

        res.status(201).json(
            { 
                message: "Usuário registrado com sucesso"
            }
        )

    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json(
                { 
                    error: "Email já cadastrado" 
                }
            )
        } else {
            res.status(500).json(
                { 
                    error: "Erro ao criar usuário" 
                }
            )
        }
    }
}

exports.auth = async (req, res) => {
    const { email, senha } = req.body

    try {
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(400).json(
                { 
                    error: "Email não encontrado" 
                }
            )
        }

        const validPassword = await bcrypt.compare(senha, user.senha)
        if (!validPassword) {
            return res.status(400).json(
                { 
                    error: "Senha incorreta" 
                }
            )
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        )

        user.lastToken = token
        await user.save()

        res.status(200).json(
            { 
                message: "Autenticado", userId: user.id, token 
            }
        )

    } catch (error) {
        console.log('Error authenticating user', error)
        res.status(500).json(
            {
                error: "Erro ao autenticar o usuário" 
            }
        )
    }
}

exports.logout = async (req, res) => {
    const userId = req.user.id

    try {
        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).json(
                {
                     error: "Usuário não encontrado" 
                }
            )
        }

        user.lastToken = null
        await user.save()

        res.status(200).json(
            {
                message: "Logout realizado com sucesso"
            }
        )
    } catch (error) {
        console.log('Error logging out user', error)
        res.status(500).json(
            {
                error: "Erro ao realizar logout"
            }
        )
    }
}

exports.update = async (req, res) => {
    const { nome, senha } = req.body
    const userId = req.user.id

    try {
        const user = await User.findByPk(userId)
        if (!user) {
            return res.status(404).json(
                {
                    error: "Usuário não encontrado"
                }
            )
        }

        user.nome = nome || user.nome

        if (senha) {
            const hashedPassword = await bcrypt.hash(senha, 10)
            user.senha = hashedPassword
        }

        await user.save()

        res.status(200).json(
            {
                message: "Dados atualizados com sucesso"
            }
        )

    } catch (error) {

        console.log('Error updating user', error)
        res.status(500).json(
            { 
                error: "Erro ao atualizar usuário" 
            }
        )
    }
}
