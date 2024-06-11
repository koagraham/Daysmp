import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

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