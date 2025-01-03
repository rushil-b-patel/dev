import { Route, Routes } from 'react-router-dom'
import About from './About.jsx'
import Navbar from './Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<About />} />
        <Route path='/project' element={<About />} />
      </Routes>
    </>
  )
}

export default App