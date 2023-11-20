import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar2 from './NavBar2';

function ScoutForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [nombre, setNombre] = useState('');
  const [organizacion, setOrganizacion] = useState('');
  const [pais, setPais] = useState('');
  const [fechaInicioActividad, setFechaInicioActividad] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('ID del usuario no encontrado');
      return;
    }

    const scoutData = {
      userId, // Incluir el userId aquí
      nombre,
      organizacion,
      pais,
      fechaInicioActividad
    };

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró el token de autenticación');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/scouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(scoutData)
      });
    
      if (response.ok) {
        console.log('Scout creado exitosamente');
        navigate('/main');
      } else {
        const errorData = await response.json();
        console.error('Error al crear el Scout:', errorData.message);
      }
    } catch (error) {
      console.error('Error de red al crear el Scout:', error);
    }
    
  };

  return (
    <div>
      <Navbar2 />
      <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 180px)' }}>
        <div className="authentication w-full max-w-md p-4">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">Completa tus datos para continuar</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-blue-500">Username:</label>
              <input
                type="text"
                value={username}
                readOnly
                className="border rounded-md p-2 mt-2 w-full focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-blue-500">Nombre:</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="border rounded-md p-2 mt-2 w-full focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-blue-500">Organización:</label>
              <input
                type="text"
                value={organizacion}
                onChange={(e) => setOrganizacion(e.target.value)}
                required
                className="border rounded-md p-2 mt-2 w-full focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-blue-500">País:</label>
              <input
                type="text"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                className="border rounded-md p-2 mt-2 w-full focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-blue-500">Fecha de Inicio de Actividad:</label>
              <input
                type="date"
                value={fechaInicioActividad}
                onChange={(e) => setFechaInicioActividad(e.target.value)}
                className="border rounded-md p-2 mt-2 w-full focus:outline-none focus:ring focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-md py-2 px-4 mt-4 w-full hover:bg-indigo-500 focus:outline-none focus:ring focus:border-indigo-500"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ScoutForm;
