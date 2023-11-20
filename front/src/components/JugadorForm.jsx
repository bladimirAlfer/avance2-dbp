import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar2 from './NavBar2'; // Importa el componente Navbar

function JugadorForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [nombre, setNombre] = useState('');
  const [posicion, setPosicion] = useState('');
  const [equipoActual, setEquipo] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('ID del usuario no encontrado');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no encontrado');
      return;
    }
  
    if (!fechaNacimiento) {
      console.error('Fecha de Nacimiento no puede estar vacía');
      return;
    }
  
    const jugadorData = {
      userId, // Incluir el userId aquí
      nombre,
      posicion,
      equipoActual,
      fechaNacimiento,
      nacionalidad,
      fotoUrl
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/jugadores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Incluye el token aquí
        },
        body: JSON.stringify(jugadorData),
      });
  
      if (response.ok) {
        console.log('Jugador creado exitosamente');
        navigate('/main');
      } else {
        console.error('Error al crear el jugador');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };
  

  return (
    <div>
      <Navbar2 />
      <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 180px)' }}>
        <div className="authentication w-full max-w-md p-4">
          <h2 className="text-2xl font-bold mb-4 text-blue-500">Completa tus datos para continuar</h2>
          <form onSubmit={handleSubmit}>
            {/* Campos del formulario */}
            <div className="mb-4">
              <label className="block text-blue-500">Username:</label>
              <input type="text" value={username} readOnly className="border rounded-md p-2 mt-2 w-full focus:outline-none focus:ring focus:border-indigo-500" />
            </div>
            <div className="mb-4">
              <label className="block text-blue-500">Nombre:</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="border rounded-md p-2 mt-2 w-full focus:outline-none focus:ring focus:border-indigo-500" />
            </div>
            <div className="mb-4">
              <label className="block text-blue-500">Posición:</label>
              <input type="text" value={posicion} onChange={(e) => setPosicion(e.target.value)} className="border rounded-md p-2 mt-2 w-full focus:outline-none focus:ring focus:border-indigo-500" />
            </div>
            <div className="mb-4">
              <label className="block text-blue-500">Equipo Actual:</label>
              <input type="text" value={equipoActual} onChange={(e) => setEquipo(e.target.value)} className="border rounded-md p-2 mt-2 w-full focus:outline-none focus:ring focus:border-indigo-500" />
            </div>
            <div className="mb-4">
              <label className="block text-blue-500">Fecha de Nacimiento:</label>
              <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required className="border rounded-md p-2 mt-2 w-full focus:outline-none focus:ring focus:border-indigo-500" />
            </div>
            <div className="mb-4">
              <label className="block text-blue-500">Nacionalidad:</label>
              <input type="text" value={nacionalidad} onChange={(e) => setNacionalidad(e.target.value)} required className="border rounded-md p-2 mt-2 w-full focus:outline-none focus:ring focus:border-indigo-500" />
            </div>
            <div className="mb-4">
              <label className="block text-blue-500">URL de Foto:</label>
              <input type="text" value={fotoUrl} onChange={(e) => setFotoUrl(e.target.value)} className="border rounded-md p-2 mt-2 w-full focus:outline-none focus:ring focus:border-indigo-500" />
            </div>
            <button type="submit" className="bg-indigo-600 text-white rounded-md py-2 px-4 mt-4 w-full hover:bg-indigo-500 focus:outline-none focus:ring focus:border-indigo-500">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JugadorForm;
