import { Link } from 'react-router-dom'

export default function Post(post) {
    const { title, category, postID} = post

    return (
        <div className="border p-2 m-1">
            <Link className="text-yellow-500 text-2xl outline-text font-bold hover:underline" to={`/forum/${postID}`}>{title}</Link>
            <h3 className="text-white outline-text">{category}</h3>
        </div>
    )
}