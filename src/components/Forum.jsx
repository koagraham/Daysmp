import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import PostSquare from './forum/PostSquare.jsx'
import axios from 'axios'

export default function Forum() {
    const loggedIn = useSelector((state) => state.loggedIn)
    const userID = useSelector((state) => state.userID)
    const [posts, setPosts] = useState([])
    const dispatch = useDispatch()
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('General')
    const [body, setBody] = useState('')
    
    const getPosts = async () => {
        const res = await axios.get('/api/posts')
        const posts = res.data.posts
        setPosts(posts)
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
    }

    const createPost = () => {
        setIsEditing(true)
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

    useEffect(() => {
        sessionCheck();
        getPosts();
    }, [])

    if (loggedIn === true && isEditing === false) {
        return (
            <>
                <h1>You found the forum page!</h1>
                <button onClick={createPost}>Create Post</button>
                <div>{posts.map((post) => (
                    <PostSquare key={post.postID} {...post}/>
                ))}</div>
            </>
        )
    }
    if (loggedIn && isEditing) {
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
    if (!loggedIn) {
        return (
            <h1>You must be logged in to view this page</h1>
        )
    }
}