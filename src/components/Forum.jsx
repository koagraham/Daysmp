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
            <div className="relative bg-cover bg-center h-screen max-w-screen flex flex-col justify-center items-center" style={{ backgroundImage: "url('https://i.redd.it/fteatt0lgoz61.png')" }}>
                <h1 className="text-4xl text-white font-bold outline-text p-4">The Forums</h1>
                <button className="border font-semibold text-black bg-white rounded-md px-2 py-1 hover:bg-yellow-500" onClick={createPost}>Create Post</button>
                <div>{posts.map((post) => (
                    <PostSquare key={post.postID} {...post}/>
                ))}</div>
                <div className="text-2xl text-white outline-text">
                    {/* Pagination UI */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button className="m-1 border px-2 hover:underline" key={index + 1} onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        )
    }
    if (isEditing) {
        return (
            <form onSubmit={handleSubmit} className="relative bg-cover bg-center h-screen max-w-screen flex flex-col p-5 items-center" style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp10723209.jpg')" }}>
                <label htmlFor="title" className="text-2xl text-white outline-text font-bold">Title</label>
                <input type="text" id="title" name="title" maxLength="40" value={title} required
                onChange={(e) => setTitle(e.target.value)} placeholder="title"></input>
                <label htmlFor="category" className="text-2xl text-white outline-text font-bold m-1">Category</label>
                <select id="category" name="category" value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="m-1">
                    <option value="General">General</option>
                    <option value="Help">Help</option>
                    <option value="Off Topic">Off Topic</option>
                    <option value="PvP">PvP</option>
                </select>
                <textarea id="body" name="body" maxLength="500" value={body} required
                onChange={(e) => setBody(e.target.value)} placeholder="Write your post here..."
                className="m-1 h-36 p-2 border rounded-md resize-y"
                style={{ minWidth: '800px' }}>
                </textarea>
                <button type="submit" className="m-1 border font-semibold text-black bg-white rounded-md px-2 py-1 hover:bg-yellow-500">Post</button>
            </form>
        )
    }
}