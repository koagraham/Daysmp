import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import '../index.css'

export default function App() {

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
    else {
        navigate("/login")
    }
  }

  useEffect(() => {
    sessionCheck()
  }, [])

  return (
    <div>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}