import React, { useState, useEffect } from 'react';
import { Drawer, AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import PerfilJugador from './Perfil';
import PerfilScout from './PerfilScout';
import FormularioPublicacion from './FormularioPublicacion';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditPublicacionForm from './EditPublicacionForm';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const [usuarioInfo, setUsuarioInfo] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [publicaciones, setPublicaciones] = useState([]);
    const [formularioAbierto, setFormularioAbierto] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingPublicacion, setEditingPublicacion] = useState(null);

    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const roles = localStorage.getItem('roles');
    const jugadorId = usuarioInfo ? usuarioInfo.id : null;

    useEffect(() => {
        fetchPublicaciones();
    }, [jugadorId]);

    useEffect(() => {
        const fetchUsuarioInfo = async () => {
            const token = localStorage.getItem('token');
            let url = `http://localhost:8080/api/users/info/${username}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsuarioInfo(data);
                }
            } catch (error) {
                console.log('Error fetching user info:', error);
            }
        };

        fetchUsuarioInfo();
    }, [username]);

    const handleSelect = (option) => {
        setSelectedOption(option);
        setDrawerOpen(false);
        if (option === 'logout') {
            localStorage.removeItem('token');
            localStorage.removeItem('roles');
            navigate('/');
        }
    }

    const handleUpdateProfile = (updatedProfileInfo) => {
        setUsuarioInfo(updatedProfileInfo);
    }

    const handleAddComment = (publicacion) => {
        // Implementar lógica para agregar comentarios
        console.log('Añadir comentario a la publicación:', publicacion);
    };

    const handleEdit = (publicacion) => {
        setEditingPublicacion(publicacion);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('¿Seguro que quieres eliminar esta publicación?');
        if (!isConfirmed) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/publicaciones/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log('Publicación eliminada con éxito');
                fetchPublicaciones();
            } else {
                console.log('Error al eliminar la publicación:', response.statusText);
            }
        } catch (error) {
            console.log('Error al eliminar la publicación:', error);
        }
    };

    const fetchPublicaciones = async () => {
        let url = roles === 'jugador' ? `http://localhost:8080/api/publicaciones/${jugadorId}` : 'http://localhost:8080/api/publicaciones';

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setPublicaciones(data);
            } else {
                console.log('Error al obtener las publicaciones:', response.statusText);
            }
        } catch (error) {
            console.log('Error al obtener las publicaciones:', error);
        }
    };

    const abrirFormulario = () => {
        setFormularioAbierto(true);
    };

    const cerrarFormulario = () => {
        setFormularioAbierto(false);
    };

    const cerrarFormularioEdicion = () => {
        setIsEditing(false);
        setEditingPublicacion(null);
        fetchPublicaciones();
    };

    return (
        <Box sx={{ maxHeight: '100vh', overflowY: 'auto' }}>
            <AppBar position="fixed" style={{ maxWidth: 240, height: 64 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(!drawerOpen)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        {usuarioInfo ? `Hola ${usuarioInfo.nombre}` : 'Cargando...'}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Sidebar onSelect={handleSelect} usuarioInfo={usuarioInfo} />
            </Drawer>

            <div className="main-content" style={{ marginTop: 64, marginLeft: 250 }}>
                {selectedOption === 'perfil' && (
                    roles === 'jugador' ? <PerfilJugador usuarioInfo={usuarioInfo} onProfileUpdate={handleUpdateProfile} /> : <PerfilScout usuarioInfo={usuarioInfo} onProfileUpdate={handleUpdateProfile} />
                )}

                {selectedOption === 'publicaciones' && (
                    <div>
                        {roles === 'jugador' && (
                            <button onClick={abrirFormulario} className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 mb-4">
                                Crear Publicación
                            </button>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {publicaciones.map(publicacion => (
                                <div key={publicacion.id} className="bg-white border border-gray-300 rounded-lg shadow-lg" style={{ maxWidth: '500px' }}>
                                    <div className="p-4">
                                        <Typography variant="h5" component="div" className="text-xl font-semibold mb-2">
                                            {publicacion.titulo}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" className="mb-2">
                                            {publicacion.contenido}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" className="mb-2">
                                            <strong>Fecha de Publicación:</strong> {publicacion.fechaPublicacion}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" className="mb-2">
                                            <strong>URL:</strong> {publicacion.urlVideo}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" className="mb-2">
                                            <strong>Publicado por:</strong> {publicacion.jugador.nombre}
                                        </Typography>
                                    </div>
                                    {roles === 'jugador' && (
                                        <div className="p-2 bg-gray-100 border-t border-gray-300 flex items-center justify-between">
                                            <IconButton onClick={() => handleEdit(publicacion)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(publicacion.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    )}

                                    {roles === 'scout' && (
                                        <div className="p-2 bg-gray-100 border-t border-gray-300 flex items-center justify-between">
                                            <button onClick={() => handleAddComment(publicacion)} className="text-blue-500 hover:underline focus:outline-none">
                                                <CommentIcon className="mr-2" />
                                                Comentar
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {formularioAbierto && (
                    <FormularioPublicacion usuarioInfo={usuarioInfo} onUpdate={fetchPublicaciones} onClose={cerrarFormulario} />
                )}

                {isEditing && editingPublicacion && (
                    <EditPublicacionForm publicacion={editingPublicacion} onUpdate={fetchPublicaciones} onClose={cerrarFormularioEdicion} />
                )}
            </div>
        </Box>
    );
}

export default Main;
