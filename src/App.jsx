import { Route, Routes } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Intro from './pages/Intro'


function App() {
  return (
    <div>
      <Navbar />
      <Intro />
      <Routes>
        <Route path='/about' element={<div></div>} />
        <Route path='/contact' element={<div />} />
        <Route path='/project' element={<></>} />
      </Routes>
    </div>
  )
}

export default App