import React, { useState, useEffect } from 'react';
import { Button, TextField, Snackbar } from '@mui/material';

const Perfil = ({ usuarioInfo, onProfileUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [nombre, setNombre] = useState(usuarioInfo.nombre);
  const [posicion, setPosicion] = useState(usuarioInfo.posicion);
  const [edad, setEdad] = useState(usuarioInfo.edad);
  const [equipo, setEquipo] = useState(usuarioInfo.equipo);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const userId = localStorage.getItem('userId'); // Obtén el ID del usuario desde localStorage

  useEffect(() => {
    // Realiza una solicitud GET para obtener los datos del jugador por el ID del usuario
    const fetchJugadorData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/jugadores/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setNombre(data.nombre);
          setPosicion(data.posicion);
          setEdad(data.edad);
          setEquipo(data.equipo);
        } else {
          console.error('Error al obtener los datos del jugador');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    if (userId) {
      fetchJugadorData();
    }
  }, [userId]);
  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    // Construye el objeto de datos para la actualización
    const updatedProfileInfo = {
      id: usuarioInfo.id, // Mantén el id existente
      nombre,
      posicion,
      edad,
      equipo,
    };

    // Realiza una solicitud PUT para actualizar el perfil
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/jugadores/update/${usuarioInfo.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProfileInfo),
      });

      if (response.ok) {
        // Actualiza el estado del perfil con los nuevos datos
        onProfileUpdate(updatedProfileInfo);
        setSnackbarOpen(true); // Muestra un mensaje de éxito
        setEditMode(false); // Sal del modo de edición
      } else {
        console.error('Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-white text-3xl font-bold mb-6 text-center">Perfil de Jugador</h2>
      {editMode ? (
        <div className="space-y-4">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-3 rounded text-gray-900"
            placeholder="Nombre"
          />
          <input
            type="text"
            value={posicion}
            onChange={(e) => setPosicion(e.target.value)}
            className="w-full p-3 rounded text-gray-900"
            placeholder="Posición"
          />
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className="w-full p-3 rounded text-gray-900"
            placeholder="Edad"
          />
          <input
            type="text"
            value={equipo}
            onChange={(e) => setEquipo(e.target.value)}
            className="w-full p-3 rounded text-gray-900"
            placeholder="Equipo"
          />
          <button
            onClick={handleSaveClick}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Guardar Cambios
          </button>
        </div>
      ) : (
        <div className="text-white space-y-3">
          <p><span className="font-bold">Nombre:</span> {nombre}</p>
          <p><span className="font-bold">Posición:</span> {posicion}</p>
          <p><span className="font-bold">Edad:</span> {edad}</p>
          <p><span className="font-bold">Equipo:</span> {equipo}</p>
          <button
            onClick={handleEditClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            Editar Perfil
          </button>
        </div>
      )}
      {/* Snackbar code */}
    </div>
  );
};

export default Perfil;