import React, { useState } from 'react';
import AuthenticationForm from './components/AuthenticationForm';
import JugadorForm from './components/JugadorForm';
import ScoutForm from './components/ScoutForm';
import Main from './components/Main';
import RoleSelectionPage from './components/RoleSelectionPage';


import { Routes, Route } from 'react-router-dom';
import './index.css';
import Analytics from './components/Analytics';


const App = () => {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const updateUser = (data, role) => {
    setUserData(data);
    setUserRole(role);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Analytics />} />
        <Route path="/auth" element={<AuthenticationForm />} />
        <Route path="/formulario-jugador" element={<JugadorForm />} />
        <Route path="/formulario-scout" element={<ScoutForm />} />
        <Route path="/main" element={<Main />} />
        <Route path="/RoleSelectionPage" element={<RoleSelectionPage />} />
      </Routes>
    </div>
  );
};

export default App;
