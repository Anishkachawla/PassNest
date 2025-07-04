import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='bg-emerald-900 text-white shadow-md flex justify-between items-center px-10 py-4 relative'>
      <div className='logo font-bold text-2xl tracking-wide'>&lt;PassNest/&gt;</div>

      <button onClick={toggleMenu} className='md:hidden text-white focus:outline-none' aria-label="Toggle menu">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <ul className={`md:flex md:gap-4 ${isMenuOpen ? 'flex flex-col absolute top-full left-0 w-full bg-emerald-900 py-4 items-center z-10' : 'hidden'}`}>
        <li><Link className='hover:text-emerald-300 transition-colors duration-200 px-3 py-2 block' to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
        <li><Link className='hover:text-emerald-300 transition-colors duration-200 px-3 py-2 block' to="/passwords" onClick={() => setIsMenuOpen(false)}>All Passwords</Link></li>
      </ul>
      
    </nav>
  );
};

export default Navbar;