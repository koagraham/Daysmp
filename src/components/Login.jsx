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
        <div className="relative bg-cover bg-center h-screen max-w-screen flex flex-col p-5 items-center" style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp10723209.jpg')" }}>
            <nav>
                <h1 className="text-3xl text-white outline-text font-bold">{loggedIn ? "" : "Login"}</h1>
            </nav>
                {!userID && 
                    <>
                        <button className="m-2 border font-semibold text-black bg-white rounded-md px-2 py-1 hover:bg-yellow-500" onClick={() => setShowRegister(true)}>Register a new account</button>
                    </>
                }
            {!userID &&
                <form  onSubmit={handleLogin}>
                    <input 
                        type='text' 
                        value={username} 
                        placeholder='Username' 
                        onChange={(e) => setUsername(e.target.value)}
                        className="m-1"
                        />
                    <input 
                        type='password'
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        className="m-1"
                        />
                    <input 
                        type='submit'
                        className="m-2 border font-semibold text-black bg-white rounded-md px-2 py-1 hover:bg-yellow-500"
                        />
                </form>
            }
            {userID && 
                <>
                    <h3 className="text-yellow-500 text-4xl outline-text font-bold">Welcome, {userName}</h3>
                    <button className="m-2 border font-semibold text-black bg-white rounded-md px-2 py-1 hover:bg-yellow-500" onClick={handleLogout}>Logout</button>
                </>
            }
        </div>
    )
}