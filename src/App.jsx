import { Outlet, Link } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { useSelector, useDispatch } from 'react-redux'

export default function App() {
  return (
    <>
      <Navbar />

      <hr />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}