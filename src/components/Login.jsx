import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Register from './Register.jsx'

export default function Login() {   
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showRegister, setShowRegister] = useState(false)

    const userID = useSelector((state) => state.userID)
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
                payload: res.data.userID
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
                payload: res.data.userID
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
            <h1>Login/Logout Page</h1>
            {userID && 
                <button onClick={handleLogout}>Logout</button>
            }
            {!userID && 
                <>
                    <button>Login</button>
                    <button onClick={() => setShowRegister(true)}>Register</button>
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
            <h3>Welcome, user #{userID}</h3>
        }
        </>
    )
}