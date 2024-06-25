import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import PostSquare from './forum/PostSquare.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Forum() {
    //redux store variables
    const loggedIn = useSelector((state) => state.loggedIn)
    const userID = useSelector((state) => state.userID)

    //state variables
    const [posts, setPosts] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('General')
    const [body, setBody] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    //action declarations
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    //helper functions
    const getPosts = async () => {
        const res = await axios.get(`/api/posts?page=${currentPage}`)
        setTotalPages(res.data.totalPages)
        setPosts(res.data.posts)
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

    const createPost = async () => {
        sessionCheck()
        if (loggedIn) {
            setIsEditing(true)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await submitPost(title, category, body)
        //default state values
        setTitle('');
        setCategory('General');
        setBody('');
    }

    const submitPost = async (title, category, body) => {
        const data = {
            title: title,
            category: category,
            body: body,
            userID: userID
        }
        const res = await axios.post('/api/post', data)
        setIsEditing(false)
        getPosts()
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getPosts();
    }, [currentPage])

    if (!isEditing) {
        return (
            <>
                <h1>The Forums</h1>
                <button onClick={createPost}>Create Post</button>
                <div>{posts.map((post) => (
                    <PostSquare key={post.postID} {...post}/>
                ))}</div>
                <div>
                    {/* Pagination UI */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </>
        )
    }
    if (isEditing) {
        return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <br />
                <input type="text" id="title" name="title" maxLength="60" value={title} required
                onChange={(e) => setTitle(e.target.value)}></input>
                <br />
                <label htmlFor="category">Category</label>
                <br />
                <select id="category" name="category" value={category}
                onChange={(e) => setCategory(e.target.value)}>
                    <option value="General">General</option>
                    <option value="Help">Help</option>
                    <option value="Off Topic">Off Topic</option>
                    <option value="PvP">PvP</option>
                </select>
                <br />
                <textarea id="body" name="body" maxLength="500" value={body} required
                onChange={(e) => setBody(e.target.value)}></textarea>
                <br />
                <button type="submit">Post</button>
            </form>
        )
    }
}