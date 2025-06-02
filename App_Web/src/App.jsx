import { useState } from 'react'
import './App.css'

// Pages
import Login from './pages/Login.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login />
    </>
  )
}

export default App
