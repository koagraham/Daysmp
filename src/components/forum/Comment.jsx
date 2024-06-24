import { useState, useEffect } from 'react'
import { AiOutlineLike, AiFillLike } from "react-icons/ai"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Comment({ commentID, body }) {
    //state variables
    const [author, setAuthor] = useState('')
    const [likes, setLikes] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [commentLikeID, setCommentLikeID] = useState(null)

    //redux store variables
    const userID = useSelector((state) => state.userID)
    const loggedIn = useSelector((state) => state.loggedIn)

    //action declarations
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getComment = async () => {
        const res = await axios.get(`/api/comments/${commentID}`) 
        setLikes(res.data.likes)
        setIsLiked(res.data.isLiked)
        setCommentLikeID(res.data.commentLikeID)
        setAuthor(res.data.author)
    }

    const sessionCheck = async () => {
        const res = await axios.get('/api/session-check')

        if (res.data.success) {
            dispatch({
                type: "USER_AUTH",
                payload: {
                    userID: res.data.userID,
                    username: res.data.username,
                    loggedIn: true
                }
            })
        }
        else {
            navigate("/login")
        }
    }

    const toggleLike = async () => {
        sessionCheck()
        if (loggedIn) {
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