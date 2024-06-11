import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Comment(comment) {
    const { body, userID } = comment
    const [author, setAuthor] = useState('')

    const getAuthor = async () => {
        const res = await axios.get(`/api/author/${userID}`)
        setAuthor(res.data.username)
    }

    useEffect(() => {
        getAuthor()
    }, [])

    return (
        <li>
            <h4>{author}</h4>
            <p>{body}</p>
        </li>
    )
}