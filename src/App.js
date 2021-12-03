import './App.css';
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from './login/Login'
import Dashboard from './dashboard/Dashboard'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
