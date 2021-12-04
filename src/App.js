import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import NotFound from './views/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route component={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
