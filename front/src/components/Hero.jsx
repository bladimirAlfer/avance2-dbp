import React from 'react';

const Hero = () => {
  return (
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
  );
};

export default Hero;
