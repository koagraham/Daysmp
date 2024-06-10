import { useSelector } from 'react-redux'

export default function Forum() {
    const loggedIn = useSelector((state) => state.loggedIn)

    if (loggedIn) {
        return (
            <h1>You found the forum page!</h1>
        )
    }
    else {
        return (
            <h1>You must be logged in to view this page</h1>
        )
    }
}