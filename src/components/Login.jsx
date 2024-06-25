import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Register from './Register.jsx'

export default function Login() {   
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showRegister, setShowRegister] = useState(false)

    const userID = useSelector((state) => state.userID)
    const userName = useSelector((state) => state.username)
    const loggedIn = useSelector((state) => state.loggedIn)
    const dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault()

        const body = {
            username: username,
            password: password
        }

        const res = await axios.post('/api/login', body)

        if (res.data.success) {
            dispatch({
                type: "USER_AUTH",
                payload: {
                    userID: res.data.userID,
                    username: res.data.username
                }
            })

            setUsername("")
            setPassword("")
        }
    }

    const handleLogout = async () => {
        const res = await axios.get('/api/logout')

        if (res.data.success) {
            dispatch({
                type: "LOGOUT"
            })
        }
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
        sessionCheck()
    }, [])

    return showRegister ? (
        <Register setShowRegister={setShowRegister} />
    ) : (
        <>
        <nav>
            <h1>{loggedIn ? "Logout" : "Login"}</h1>
            {!userID && 
                <>
                    <button onClick={() => setShowRegister(true)}>Register a new account</button>
                </>
            }
        </nav>
        {!userID &&
            <form onSubmit={handleLogin}>
                <input 
                    type='text' 
                    value={username} 
                    placeholder='Username' 
                    onChange={(e) => setUsername(e.target.value)}
                    />
                <input 
                    type='password'
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <input 
                    type='submit'
                    />
            </form>
        }
        {userID && 
            <>
                <h3>Welcome, {userName}</h3>
                <button onClick={handleLogout}>Logout</button>
            </>
        }
        </>
    )
}