import React, { useState } from 'react';

const FormularioPublicacion = ({ usuarioInfo, onUpdate, onClose }) => {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [urlVideo, setUrlVideo] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!titulo.trim() || !contenido.trim()) {
            alert('El título y el contenido son obligatorios');
            return;
        }

        const nuevaPublicacion = {
            titulo: titulo,
            contenido: contenido,
            urlVideo: urlVideo,
            autorId: usuarioInfo.id, // Asegúrate de que usuarioInfo contiene un campo 'id'
        };

        try {
            const response = await fetch('http://localhost:8080/api/publicaciones', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaPublicacion),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Publicación creada:', data);
                onUpdate && onUpdate();

                setTitulo('');
                setContenido('');
                setUrlVideo('');
                onClose();
            } else {
                console.log('Error al crear la publicación:', response.statusText);
                // Aquí podrías mostrar un mensaje de error al usuario
            }
        } catch (error) {
            console.log('Error al crear la publicación:', error);
            // Manejo de errores de red o del servidor
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 backdrop-blur">
            <div className="bg-gray-900 text-white p-6 rounded-lg shadow-xl w-96">
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="text-white text-xl hover:text-gray-400 focus:outline-none"
                    >
                        X
                    </button>
                </div>
                <h2 className="text-2xl font-semibold mb-4">Crear una nueva publicación</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="titulo" className="block text-sm font-medium">
                            Título
                        </label>
                        <input
                            type="text"
                            id="titulo"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Escribe un título"
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="contenido" className="block text-sm font-medium">
                            Contenido
                        </label>
                        <textarea
                            id="contenido"
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}
                            placeholder="Escribe tu publicación..."
                            className="w-full h-32 bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-3 resize-none focus:outline-none focus:border-blue-500"
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="urlVideo" className="block text-sm font-medium">
                            URL del Video (opcional)
                        </label>
                        <input
                            type="text"
                            id="urlVideo"
                            value={urlVideo}
                            onChange={(e) => setUrlVideo(e.target.value)}
                            placeholder="Agrega una URL del video"
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            Publicar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormularioPublicacion;
