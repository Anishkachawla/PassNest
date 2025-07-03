import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import React from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Passwords from './components/Passwords'
import { PasswordProvider } from './contexts/PasswordContext';

function App() {

  return (
    <>
      <PasswordProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Manager/>}/>
          <Route path='/passwords' element={<Passwords/>}/>
        </Routes>
      </PasswordProvider>
    </>
  )
}

export default App
