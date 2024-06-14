import { User, Post, Comment, PostLike, CommentLike } from '../src/database/model.js'
import { db } from '../src/database/model.js'
import postData from './data/posts.json' assert { type: 'json' }
import commentData from './data/comments.json' assert { type: 'json'}
import lodash from 'lodash'
import bcryptjs from 'bcryptjs'

console.log('Syncing database...')
await db.sync({ force: true })

console.log('Seeding database...')

const usersToCreate = []
for (let i = 1; i < 10; i++) {
    usersToCreate.push({username: `user${i}`, email: `user${i}@gmail.com`, password: bcryptjs.hashSync('test', bcryptjs.genSaltSync(10))})
}

const usersInDB = await Promise.all(usersToCreate.map(async (user) => {
    const {username, email, password} = user

    const newUser =  await User.create({username, email, password})

    return newUser
}))

const postsInDB = await Promise.all(postData.map((post) => {
    const {title, category, body, userID} = post
    
    const newPost = Post.create({title, category, body, userID})

    return newPost
}))

const commentsInDB = await Promise.all(commentData.map((comment) => {
    const {body, postID, userID} = comment

    const newComment = Comment.create({body, postID, userID})

    return newComment
}))

const postLikesInDB = await Promise.all(usersInDB.flatMap((user) => {
    const postLikes = postsInDB.map((post) => {
        if (lodash.random(1, 10) <= 5) {
            return PostLike.create({ postID: post.postID, userID: user.userID })
        }
    })

    return postLikes
}))

const commentLikesInDB = await Promise.all(usersInDB.flatMap((user) => {
    const commentLikes = commentsInDB.map((comment) => {
        if (lodash.random(1, 10) <= 5) {
            return CommentLike.create({ commentID: comment.commentID, userID: user.userID })
        }
    })

    return commentLikes
}))

await db.close()
console.log('Finished seeding database!')