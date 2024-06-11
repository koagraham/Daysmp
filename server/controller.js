import { User, Post, Comment } from '../src/database/model.js'
import bcryptjs from 'bcryptjs'

export const handlerFunctions = {
    sessionCheck: async (req, res) => {
        if (req.session.userID) {
            res.json({
                message: "user is still logged in",
                success: true,
                userID: req.session.userID,
                username: req.session.username,
                loggedIn: true
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

        res.json({
            message: 'user created',
            success: 'true',
            userID: user.userID
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
        req.session.username = user.username

        res.json({
            message: 'user logged in',
            success: true,
            userID: req.session.userID,
            username: req.session.username,
            loggedIn: true
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

    posts: async (req, res) => {
        const posts = await Post.findAll()

        res.json({
            message: 'posts requested',
            success: true,
            posts: posts
        })
    },

    post: async (req, res) => {
        const post = await Post.findByPk(req.params.postID)

        res.json({
            message: 'one post requested',
            success: true,
            post: post
        })
    },

    comments: async (req, res) => {
        try {
            const { postID } = req.params
            const comments = await Comment.findAll({where: {
                postID: postID
            }})

            res.json({
                message: 'comments requested',
                success: true,
                comments: comments
            })
        } catch (error) {
            console.error(error)
        }
    },

    author: async (req, res) => {
        const { userID } = req.params
        const user = await User.findByPk(userID)

        res.json({
            message: 'author requested',
            success: true,
            username: user.username
        })
    }
}