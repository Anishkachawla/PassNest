import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import React from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Passwords from './components/Passwords'
import Footer from './components/Footer'
import { PasswordProvider } from './contexts/PasswordContext';
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <PasswordProvider>
        <Navbar/>
        
        <main className="flex-grow overflow-y-auto">
          <Routes>
            <Route path='/' element={<Manager/>}/>
            <Route path='/passwords' element={<Passwords/>}/>
          </Routes>
        </main>
        
        <Footer/>
        <Toaster/>
      </PasswordProvider>
    </div>
  )
}

export default App;