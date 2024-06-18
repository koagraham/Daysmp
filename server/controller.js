import { User, Post, Comment, PostLike, CommentLike } from '../src/database/model.js'
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
        const author = await User.findOne({where: {userID: post.userID}})
        const likesCount = await PostLike.count({ where: { postID: req.params.postID } });
        let isLiked = false
        let postLikeID = null
        const userLiked = await PostLike.findOne({ 
            where: { 
                postID: req.params.postID, 
                userID: req.session.userID
        }})

        if (userLiked) {
            isLiked = true
            postLikeID = userLiked.postLikeID
        }

        res.json({
            message: 'one post requested',
            success: true,
            post: post,
            likes: likesCount,
            isLiked: isLiked,
            postLikeID: postLikeID,
            author: author.username
        })
    },

    createPost: async (req, res) => {
        const newPost = await Post.create({
            title: req.body.title,
            category: req.body.category,
            body: req.body.body,
            userID: req.body.userID
        })

        res.json({
            message: 'post created',
            success: true
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

    comment: async (req, res) => {
        const comment = await Comment.findByPk(req.params.commentID)
        const author = await User.findOne({where: {userID: comment.userID}})
        const likesCount = await CommentLike.count({ where: { commentID: req.params.commentID } });
        let isLiked = false
        let commentLikeID = null
        const userLiked = await CommentLike.findOne({ 
            where: { 
                commentID: req.params.commentID, 
                userID: req.session.userID
        }})

        if (userLiked) {
            isLiked = true
            commentLikeID = userLiked.commentLikeID
        }

        res.json({
            message: 'one comment requested',
            success: true,
            comment: comment,
            likes: likesCount,
            isLiked: isLiked,
            commentLikeID: commentLikeID,
            author: author.username
        })
    },

    createComment: async (req, res) => {
        const newComment = await Comment.create({
            body: req.body.body,
            userID: req.body.userID,
            postID: req.body.postID
        })

        res.json({
            message: 'comment created',
            success: true
        })
    },

    removePostLike: async (req, res) => {
        const userLiked = await PostLike.findByPk(req.params.postLikeID)
        if (userLiked) {
            await userLiked.destroy()
        }
        res.json({
            message: 'removed post like',
            success: true
        })
    },

    addPostLike: async (req, res) => {
        const { postID } = req.params
        const { userID } = req.body
        const userLiked = await PostLike.findOne({ 
            where: { 
                postID: postID,
                userID: userID
        }})
        if (!userLiked) {
            const newLike = await PostLike.create({userID: userID, postID: postID})
            res.json({
                message: 'liked post',
                success: true,
                postLikeID: newLike.postLikeID
            })
        }
        else {
            res.json({
                message: 'already liked post',
                success: true,
                postLikeID: userLiked.postLikeID
            })
        }
    },

    removeCommentLike: async (req, res) => {
        const userLiked = await CommentLike.findByPk(req.params.commentLikeID)
        if (userLiked) {
            await userLiked.destroy()
        }
        res.json({
            message: 'removed comment like',
            success: true
        })
    },

    addCommentLike: async (req, res) => {
        const { commentID } = req.params
        const { userID } = req.body
        const userLiked = await CommentLike.findOne({ 
            where: { 
                commentID: commentID,
                userID: userID
        }})
        if (!userLiked) {
            const newLike = await CommentLike.create({userID: userID, commentID: commentID})
            res.json({
                message: 'liked comment',
                success: true,
                commentLikeID: newLike.commentLikeID
            })
        }
        else {
            res.json({
                message: 'already liked comment',
                success: true,
                commentLikeID: userLiked.commentLikeID
            })
        }
    }

    // post: async (req, res) => {
    //     const user = await User.findByPk(req.session.userID)
    //     const newPost = user.createPost({

    //     })
    // }
}