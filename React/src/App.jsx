import { useState } from 'react'
import './App.css'
import Home from './Components/Home'
import Counter from './Components/Counter'
import Team from './Components/Team'
import { Routes, Route } from 'react-router-dom'
import Pagination from './Components/Pagination'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/counter" element={<Counter />} />
      <Route
        path="/team"
        element={
          <>
            <Team name="Ranvitha" role="SDE" />
            <Team name="Sathwika" role="Web developer" />
          </>
        }
      
      />
      <Route path="/p" element={<Pagination/>} />
    </Routes>
  )
}

export default App
