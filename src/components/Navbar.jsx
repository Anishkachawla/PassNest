import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='bg-emerald-900 text-white shadow-md flex justify-between items-center px-10 py-4'>
        <div className='logo font-bold text-2xl tracking-wide'>&lt;PassNest/&gt;</div>
        <ul>
            <li className='flex gap-4'>
                <Link className='hover:text-emerald-300 transition-colors duration-200 px-3 py-2' to="/">Home</Link>
                <Link className='hover:text-emerald-300 transition-colors duration-200 px-3 py-2' to="/passwords">All Passwords</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
