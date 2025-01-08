import { Route, Routes } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Intro from './pages/Intro'
import Projects from './pages/Projects'


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/intro' element={<Intro />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </div>
  )
}

export default App