import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Comment from './Comment.jsx'
import { useParams } from 'react-router-dom'
import { AiOutlineLike, AiFillLike } from "react-icons/ai"

export default function PostPage() {
    const { postID } = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [author, setAuthor] = useState('')
    const [likes, setLikes] = useState(0)
    const [isLiked, setIsLiked] = useState(true)
    const [postLikeID, setPostLikeID] = useState(null)
    const [body, setBody] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const userID = useSelector((state) => state.userID)

    const getPost = async () => {
        const res = await axios.get(`/api/posts/${postID}`) 
        setPost(res.data.post)
        setLikes(res.data.likes)
        setIsLiked(res.data.isLiked)
        setPostLikeID(res.data.postLikeID)
        setAuthor(res.data.author)
    }

    const getComments = async () => {
        const res = await axios.get(`/api/postComments/${postID}`)
        setComments(res.data.comments)
    }

    const toggleLike = async () => {
        if (isLiked) {
            await axios.delete(`/api/postLikes/${postLikeID}`)
            setLikes(likes - 1)
            setIsLiked(false)
        }
        else {
            const body = { userID: userID}
            const res = await axios.post(`/api/postLikes/${postID}`, body)
            setLikes(likes + 1)
            setIsLiked(true)
            setPostLikeID(res.data.postLikeID)
        }
    }

    const createComment = () => {
        setIsEditing(true)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await submitComment(body)
        //default state value
        setBody('');
    }

    const submitComment = async (body) => {
        const data = {
            body: body,
            userID: userID,
            postID: postID
        }
        const res = await axios.post('/api/comment', data)
        setIsEditing(false)
        getComments()
    }

    useEffect(() => {
        getPost();
        getComments();
    }, [])

    return (
        <div>
            <h1>{post.title}</h1>
            <h3>{author}</h3>
            <p>{post.body}</p>
            <button onClick={toggleLike}>{isLiked ? <AiFillLike /> : <AiOutlineLike />} {likes}</button>
            <ul>{comments.map((comment) => (
                <Comment key={comment.commentID} {...comment}/>
            ))}</ul>
            {!isEditing ?
                <button onClick={createComment}>Comment</button>
                :
                <div></div>    
            }
            {isEditing ? 
                <form onSubmit={handleSubmit}>
                    <textarea id="body" name="body" maxLength="250" value={body} required
                    onChange={(e) => setBody(e.target.value)}></textarea>
                    <br />
                    <button type="submit">Comment</button>
                </form>
                :
                <span></span>
            }
        </div>
    )
}