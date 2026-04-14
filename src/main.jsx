import { createRoot } from 'react-dom/client'
import 'react-activity-calendar/tooltips.css'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/ThemeContext'
createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)
