import { Route, Routes } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Profile from './pages/Profile'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Gallery from './pages/Gallery'


function App() {
  return (
    <div className='selection:bg-[#FBF5E5] dark:selection:bg-[#4C585B]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Profile />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/experience' element={<Experience />} />
        <Route path='/gallery' element={<Gallery />} />
      </Routes>
    </div>
  )
}

export default App