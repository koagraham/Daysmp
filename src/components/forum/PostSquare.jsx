import { Link } from 'react-router-dom'

export default function Post(post) {
    const { title, category, postID} = post

    return (
        <div>
            <Link to={`/forum/${postID}`}>{title}</Link>
            <h3>{category}</h3>
        </div>
    )
}