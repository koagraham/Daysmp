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
    <div id='register'>
      <form onSubmit={handleRegister}>
        <h1>Register</h1>

        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type='submit' value='Register' />
      </form>
    </div>
  )
}