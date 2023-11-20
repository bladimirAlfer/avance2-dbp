// Sidebar.jsx
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const Sidebar = ({ onSelect, usuarioInfo }) => { 
  return (
    <List>
      {usuarioInfo && <ListItem>
        <ListItemText primary={`Bienvenido ${usuarioInfo.nombre}!`} /> 
      </ListItem>}
      <ListItem button onClick={() => onSelect('inbox')}>
        <ListItemText primary="Inbox" />
      </ListItem>
      <ListItem button onClick={() => onSelect('perfil')}>
        <ListItemText primary="Perfil" />
      </ListItem>
      <ListItem button onClick={() => onSelect('publicaciones')}>
        <ListItemText primary="Publicaciones" />
      </ListItem>
      <ListItem button onClick={() => onSelect('logout')}>
        <ListItemText primary="Logout" />
      </ListItem>
    </List>
  );
};


export default Sidebar;
