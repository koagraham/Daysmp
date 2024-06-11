import axios from 'axios'
import { useState, useEffect } from 'react'
import Comment from './Comment.jsx'
import { useParams } from 'react-router-dom'

export default function PostPage() {
    const { postID } = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    
    const getPost = async () => {
        const res = await axios.get(`/api/posts/${postID}`) 
        setPost(res.data.post)
    }

    const getComments = async () => {
        const res = await axios.get(`/api/comments/${postID}`)
        setComments(res.data.comments)
    }

    useEffect(() => {
        getPost();
        getComments();
    }, [])

    return (
        <div>
            <h1>{post.title}</h1>
            <h3>{post.category}</h3>
            <p>{post.body}</p>
            <ul>{comments.map((comment) => (
                <Comment key={comment.commentID} {...comment}/>
            ))}</ul>
        </div>
    )
}