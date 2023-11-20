import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function RoleSelectionPage() {
    const navigate = useNavigate();

    const handleRoleSelection = async (role) => {
        console.log('Rol seleccionado:', role);
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token'); // Obtener el token de autenticación
    
        if (!userId || !token) {
            // Manejar el caso en el que el ID del usuario o el token no estén disponibles
            console.error('ID de usuario o token no encontrados en el localStorage');
            // Redirigir o realizar alguna otra acción, por ejemplo, mostrar un mensaje de error
            return;
        }
    
        try {
            const response = await fetch(`http://localhost:8080/api/auth/user/${userId}/assign-role`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(role), // Enviar el rol como una cadena simple
            });
    
            if (response.ok) {
                // El rol se asignó correctamente
                localStorage.setItem('userRole', role); // Guardar el rol en localStorage
                navigate(role === 'jugador' ? '/formulario-jugador' : '/formulario-scout');
            } else {
                // Manejar errores en la respuesta del servidor
                console.error('Error al asignar el rol:', response.statusText);
                // Realizar alguna acción en caso de error, como mostrar un mensaje de error
            }
        } catch (error) {
            console.error('Error al realizar el patch:', error);
            // Realizar alguna acción en caso de error, como mostrar un mensaje de error
        }
    };
    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-start h-screen pt-20">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-6">Elige tu Rol</h2>
                    <button 
                        onClick={() => handleRoleSelection('jugador') }
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 my-1 transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        Registrarse como Jugador
                    </button>
                    <button 
                        onClick={() => handleRoleSelection('scout') }
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 my-1 transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        Registrarse como Scout
                    </button>
                </div>
            </div>
        </div>
    );
}
