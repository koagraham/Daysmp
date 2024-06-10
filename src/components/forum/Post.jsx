export default function Post(post) {
    const { title, category, body} = post

    return (
        <div>
            <h1>{title}</h1>
            <h3>{category}</h3>
            <p>{body}</p>
        </div>
    )
}