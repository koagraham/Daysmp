import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import PostSquare from './forum/PostSquare.jsx'
import axios from 'axios'

export default function Forum() {
    const loggedIn = useSelector((state) => state.loggedIn)
    const [posts, setPosts] = useState([])
    const dispatch = useDispatch()
    
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

    useEffect(() => {
        sessionCheck();
        getPosts()
    }, [])

    if (loggedIn) {
        return (
            <>
                <h1>You found the forum page!</h1>
                <button>Create Post</button>
                <div>{posts.map((post) => (
                    <PostSquare key={post.postID} {...post}/>
                ))}</div>
            </>
        )
    }
    else {
        return (
            <h1>You must be logged in to view this page</h1>
        )
    }
}