import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import React from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Passwords from './components/Passwords'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Manager/>}/>
        <Route path='/passwords' element={<Passwords/>}/>
      </Routes>
    </>
  )
}

export default App
