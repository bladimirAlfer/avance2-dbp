import React from 'react';
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

const Footer = () => {
  return (
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
        <div class='lg:col-span-2 flex justify-center items-center mt-6'>
    <div class='w-auto'> 
      <h6 class='font-medium text-gray-400'>SOBRE NOSOTROS</h6>
      <ul>
        <li class='py-2 text-sm'>Quienes Somos</li>
        <li class='py-2 text-sm'>Contactanos</li>
        <li class='py-2 text-sm'>Trabaja con Nosotros</li>
        <li class='py-2 text-sm'>FAQs</li>
      </ul>
    </div>
  </div>


    </div>
  );
};

export default Footer;
