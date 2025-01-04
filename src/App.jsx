import { Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Navbar from './pages/Navbar'
import Intro from './pages/Intro'


function App() {
  return (
    <>
      <Navbar />
      <Intro />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<About />} />
        <Route path='/project' element={<About />} />
      </Routes>
    </>
  )
}

export default App