import express from 'express'
import session from 'express-session';
import morgan from 'morgan';
import ViteExpress from 'vite-express'
import { handlerFunctions } from './controller.js'

const app = express()
const port = 8002

ViteExpress.config({ printViteDevServerHost: true })

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'hello', saveUninitialized: true, resave: false }));

app.get('/api/session-check', handlerFunctions.sessionCheck) //check session validity
app.post('/api/login', handlerFunctions.login) //handle logging in
app.get('/api/logout', handlerFunctions.logout) //handle logging out
app.post('/api/register', handlerFunctions.register) //register a new user
app.get('/api/posts', handlerFunctions.posts) //get all the posts
app.get('/api/posts/:postID', handlerFunctions.post) // get a specific post
app.post('/api/post', handlerFunctions.createPost) // create a post
app.get('/api/postComments/:postID', handlerFunctions.comments) //get all the comments for a specific post
app.post('/api/comment', handlerFunctions.createComment)
app.delete('/api/postLikes/:postLikeID', handlerFunctions.removePostLike) //remove a specific like for a specific post
app.post('/api/postLikes/:postID', handlerFunctions.addPostLike) //add a like for a specific post
app.get('/api/comments/:commentID', handlerFunctions.comment) //get a specific comment
app.delete('/api/commentLikes/:commentLikeID', handlerFunctions.removeCommentLike) //delete a specific like for a comment
app.post('/api/commentLikes/:commentID', handlerFunctions.addCommentLike) //add a like for a specific comment

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port.toString()}`));