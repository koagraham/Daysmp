import { User } from '../src/database/model.js'
import bcryptjs from 'bcryptjs'

export const handlerFunctions = {
    sessionCheck: async (req, res) => {
        if (req.session.userID) {
            res.json({
                message: "user is still logged in",
                success: true,
                userID: req.session.userID
            })
            return
        }
        else {
            res.json({
                message: "no user logged in",
                success: false
            })
            return
        }
    },

    register: async (req, res) => {
        const { username, password } = req.body

        if (await User.findOne({ where: { name: username }})) {
            res.json({
                message: 'username taken'
            })
            return
        }

        const hashedPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))

        const user = await User.create({
            username: username,
            password: hashedPassword
        })

        req.session.userID = user.userID
        req.session.userName = user.username

        res.json({
            message: 'user created',
            success: 'true',
            userID: user.userID,
            userName: user.userName
        })
    },

    login: async (req, res) => {
        const { username, password } = req.body

        const user = await User.findOne({
            where: {
                username: username
            }
        })
        
        if (!user || !bcryptjs.compareSync(password, user.password)) {
            res.json({
                message: 'incorrect username or password',
                success: false
            })
            return
        }

        req.session.userID = user.userID

        res.json({
            message: 'user logged in',
            success: true,
            userID: req.session.userID
        })
    },

    logout: async (req, res) => {
        req.session.destroy()

        res.json({
            message: 'user logged out',
            success: true
        })
        return
    },
}