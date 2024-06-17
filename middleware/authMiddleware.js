const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function authenticateToken(req, res, next) {
    const userId = req.headers['user-id']
    if (!userId) {
        console.log('No user ID in header')
        return res.status(403).json({ error: "No user ID provided" })
    }

    try {
        const user = await User.findByPk(userId)
        if (!user) {
            console.log('User not found')
            return res.status(403).json({ error: "User not found" })
        }

        if (!user.lastToken) {
            console.log('No token stored for user')
            return res.status(403).json({ error: "No token stored for user" })
        }

        jwt.verify(user.lastToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log('Token verification failed', err)
                return res.status(403).json({ error: "Invalid token" })
            }
            req.user = decoded
            next()
        })
    } catch (error) {
        console.log('Error authenticating user', error)
        res.status(500).json({ error: "Erro ao autenticar o usuário" })
    }
}

module.exports = authenticateToken
