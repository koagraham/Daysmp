import { useState, useEffect } from 'react'
import { AiOutlineLike, AiFillLike } from "react-icons/ai"
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function Comment({ commentID, body }) {
    const [author, setAuthor] = useState('')
    const [likes, setLikes] = useState(0)
    const [isLiked, setIsLiked] = useState(true)
    const [commentLikeID, setCommentLikeID] = useState(null)
    const userID = useSelector((state) => state.userID)

    const getComment = async () => {
        const res = await axios.get(`/api/comments/${commentID}`) 
        setLikes(res.data.likes)
        setIsLiked(res.data.isLiked)
        setCommentLikeID(res.data.commentLikeID)
        setAuthor(res.data.author)
    }

    const toggleLike = async () => {
        if (isLiked) {
            await axios.delete(`/api/commentLikes/${commentLikeID}`)
            setLikes(likes - 1)
            setIsLiked(false)
        }
        else {
            const body = { userID: userID}
            const res = await axios.post(`/api/commentLikes/${commentID}`, body)
            setLikes(likes + 1)
            setIsLiked(true)
            setCommentLikeID(res.data.commentLikeID)
        }
    }

    useEffect(() => {
        getComment();
    }, [])

    return (
        <li>
            <h4>{author}</h4>
            <p>{body}</p>
            <button onClick={toggleLike}>{isLiked ? <AiFillLike /> : <AiOutlineLike />} {likes}</button>
        </li>
    )
}