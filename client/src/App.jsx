
import { Outlet } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Landing from './pages/Landing'
import Footer from './components/Footer'

function App() {
  
  return (
    <div>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App
