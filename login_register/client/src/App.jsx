import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter> 
      <Routes>
        <Route path = '/register' element = {<Signup/>}></Route>
        <Route path = '/login' element = {<Login/>}></Route>
        <Route path = '/home' element = {<Home/>}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
