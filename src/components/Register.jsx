import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Register({ setShowRegister}) {
  //state variables
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //action declarations
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    const body = {
      username: username,
      password: password
    }
    axios.post('/api/register', body)
    .then((res) => {
      if (res.data.success) {
        dispatch({
          type: "USER_AUTH",
          payload: res.data.userID
        })
        setShowRegister(false)
        setUsername("")
        setPassword("")
        navigate("/")
      }

    })
  }

  return (
    <div id='register' className="relative bg-cover bg-center h-screen max-w-screen flex flex-col p-5 items-center" style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp10723209.jpg')" }}>
      <form onSubmit={handleRegister}>
        <h1 className="text-4xl font-bold text-white outline-text text-center">Register</h1>

        <input
          type='text'
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="m-1"
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="m-1"
        />

        <input type='submit' value='Register' className="m-2 border font-semibold text-black bg-white rounded-md px-2 py-1 hover:bg-yellow-500"/>
      </form>
    </div>
  )
}