import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import '../index.css'

export default function App() {

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