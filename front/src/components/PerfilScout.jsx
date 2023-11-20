import React, { useState } from 'react';

const PerfilScout = ({ usuarioInfo, onProfileUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [nombre, setNombre] = useState(usuarioInfo.nombre);
  const [edad, setEdad] = useState(usuarioInfo.edad);
  const [empresa, setEmpresa] = useState(usuarioInfo.empresa);
  const [experiencia, setExperiencia] = useState(usuarioInfo.experiencia);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    const updatedProfileInfo = {
      id: usuarioInfo.id,
      nombre,
      edad,
      empresa,
      experiencia
    };

    // Realiza una solicitud PUT para actualizar el perfil
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/scouts/update/${usuarioInfo.id}`, {
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

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-10">
      <h2 className="text-white text-3xl font-bold mb-6 text-center">Perfil de Scout</h2>
      {editMode ? (
        <div className="space-y-4">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
            className="w-full p-3 rounded text-gray-900"
          />
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            placeholder="Edad"
            className="w-full p-3 rounded text-gray-900"
          />
          <input
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            placeholder="Empresa"
            className="w-full p-3 rounded text-gray-900"
          />
          <input
            type="number"
            value={experiencia}
            onChange={(e) => setExperiencia(e.target.value)}
            placeholder="Experiencia"
            className="w-full p-3 rounded text-gray-900"
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
          <p><span className="font-bold">Edad:</span> {edad}</p>
          <p><span className="font-bold">Empresa:</span> {empresa}</p>
          <p><span className="font-bold">Experiencia:</span> {experiencia}</p>
          <button
            onClick={handleEditClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            Editar Perfil
          </button>
        </div>
      )}
    </div>
  );
};

export default PerfilScout;
