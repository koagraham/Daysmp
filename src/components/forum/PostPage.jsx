import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Comment from './Comment.jsx'
import { useParams, useNavigate } from 'react-router-dom'
import { AiOutlineLike, AiFillLike } from "react-icons/ai"

export default function PostPage() {
    const { postID } = useParams()

    //state variables
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [author, setAuthor] = useState('')
    const [likes, setLikes] = useState(0)
    const [isLiked, setIsLiked] = useState(false)
    const [postLikeID, setPostLikeID] = useState(null)
    const [body, setBody] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    //redux store variables
    const userID = useSelector((state) => state.userID)
    const loggedIn = useSelector((state) => state.loggedIn)

    //action declarations
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getPost = async () => {
        const res = await axios.get(`/api/posts/${postID}`) 
        setPost(res.data.post)
        setLikes(res.data.likes)
        setIsLiked(res.data.isLiked)
        setPostLikeID(res.data.postLikeID)
        setAuthor(res.data.author)
    }

    const getComments = async () => {
        const res = await axios.get(`/api/postComments/${postID}`, {
            params: { page: page }
        })
        setComments(res.data.comments)
        setTotalPages(res.data.totalPages)
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
    }

    const createComment = () => {
        sessionCheck()
        if (loggedIn) {
            setIsEditing(true)
        }
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
    }, [page])

    return (
        <div className="relative bg-cover bg-center h-screen max-w-screen flex flex-col p-5 items-center" style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp10723209.jpg')" }}>
            <h1 className="text-4xl text-yellow-500 outline-text font-bold">{post.title}</h1>
            <h3 className="text-white font-semibold outline-text">{author}</h3>
            <div className="flex justify-center w-full mt-4">
                <p className="text-white text-2xl font-semibold outline-text border p-4">{post.body}</p>
                <button className="mx-1 border font-semibold text-black bg-white rounded-md px-2 py-1 hover:bg-yellow-500" onClick={toggleLike}>{isLiked ? <AiFillLike /> : <AiOutlineLike />} {likes}</button>
            </div>
            <ul>{comments.map((comment) => (
                <Comment key={comment.commentID} {...comment}/>
            ))}</ul>
            {!isEditing ?
                <button className="mt-2 border font-semibold text-black bg-white rounded-md px-2 py-1 hover:bg-yellow-500" onClick={createComment}>Comment</button>
                :
                <div></div>    
            }
            {isEditing ? 
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <textarea id="body" name="body" maxLength="250" value={body} required
                    onChange={(e) => setBody(e.target.value)}
                    className="m-1 w-full h-18 p-2 border rounded-md resize-y"
                    style={{ minWidth: '400px' }}>
                    </textarea>
                    <button type="submit" className=" border font-semibold text-black bg-white rounded-md px-4 py-2 hover:bg-yellow-500">Comment</button>
                </form>
                :
                <span></span>
            }

            {/* Pagination controls */}
            <div className="text-2xl text-white outline-text"></div>
            {totalPages > 1 && (
                <div className="text-2xl text-white outline-text">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button className=" m-1 border px-2 hover:underline" key={index} onClick={() => setPage(index + 1)}>{index + 1}</button>
                    ))}
                </div>
            )}
        </div>
    )
}