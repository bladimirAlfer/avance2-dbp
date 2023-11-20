import React from 'react';
import Jugador from '../assets/jugador.png';
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      {/* Navbar */}
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white bg-opacity-50 bg-black sticky top-0 z-50'>
        <h1 className='w-full text-3xl font-bold text-blue-500'>SCOUZ.</h1>
        <ul className='hidden md:flex'>
          <li className='p-4 mr-4'><Link to="/" className='text-white'>Inicio</Link></li>
          <li className='p-4 mr-4'><Link to="/auth" state={{ isSignUp: false }} className='text-white'>Login</Link></li>
          <li className='p-4'><Link to="/auth" state={{ isSignUp: true }} className='text-white'>Registrate</Link></li>
        </ul>
      </div>

      {/* Hero Section */}
      <div className='text-white'>
        <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold p-2'>
            CONECTANDO TALENTOS CON OPORTUNIDADES
          </p>
          <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
            Descubre tu Potencial.
          </h1>
          <p className='md:text-2xl text-xl font-bold text-gray-500'>
            En Scouz, tu talento es nuestra pasión. Aprovecha la oportunidad de ser descubierto y llevar tu carrera al próximo nivel.
          </p>
        </div>
      </div>

      {/* Analytics Section */}
      <div className='w-full bg-white py-16 px-4'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
          <img className='w-[500px] mx-auto my-4' src={Jugador} alt='/' />
          <div className='flex flex-col justify-center'>
            <p className='text-[#00df9a] font-bold '>PERFIL DEL JUGADOR</p>
            <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Crea y Comparte tu Perfil</h1>
            <p>
              Añade tus datos de jugador y muestra tus habilidades subiendo tus mejores vídeos de jugadas, goles, remates, etc.
            </p>
            <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'><Link to="/auth">Regístrate</Link></button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
        <div>
          <h1 className='w-full text-3xl font-bold text-[#00df9a]'>SCOUZ.</h1>
          <p className='py-4'>Muestra tus habilidades y cumple tu sueño de ser un jugador profesional.</p>
          <div className='flex justify-between md:w-[40%] my-6'>
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
          </div>
        </div>
        <div className='lg:col-span-2 flex justify-center items-center mt-6'>
          <div className='w-auto'>
            <h6 className='font-medium text-gray-400'>SOBRE NOSOTROS</h6>
            <ul>
              <li className='py-2 text-sm'>Quienes Somos</li>
              <li className='py-2 text-sm'>Contáctanos</li>
              <li className='py-2 text-sm'>Trabaja con Nosotros</li>
              <li className='py-2 text-sm'>FAQs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
