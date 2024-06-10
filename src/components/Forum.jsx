import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Post from './forum/Post.jsx'
import axios from 'axios'

export default function Forum() {
    const loggedIn = useSelector((state) => state.loggedIn)
    const [posts, setPosts] = useState([])
    
    const getPosts = async () => {
        const res = await axios.get('/api/posts')
        const posts = res.data.posts
        setPosts(posts)
    }

    useEffect(() => {
        getPosts()
    }, [])

    if (loggedIn) {
        return (
            <>
                <h1>You found the forum page!</h1>
                <div>{posts.map((post) => (
                    <Post key={post.postID} {...post}/>
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