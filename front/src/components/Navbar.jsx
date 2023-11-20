import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white bg-opacity-50 bg-black sticky top-0 z-50'>
      <h1 className='w-full text-3xl font-bold text-blue-500'>SCOUZ.</h1>
      <ul className='hidden md:flex'>
        <li className='p-4 mr-4'><Link to="/" className='text-white'>Inicio</Link></li>
        <li className='p-4 mr-4'><Link to="/auth" state={{ isSignUp: false }} className='text-white'>Login</Link></li>
        <li className='p-4'>  <Link to="/auth" state={{ isSignUp: true }} className='text-white'>Registrate</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;
