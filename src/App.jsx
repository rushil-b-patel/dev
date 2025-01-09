import { Route, Routes } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Profile from './pages/Profile'
import Projects from './pages/Projects'


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Profile />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </div>
  )
}

export default App