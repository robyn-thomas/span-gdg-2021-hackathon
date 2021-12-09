import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Toaster from 'react-hot-toast';

import Dashboard from './views/dashboard/Dashboard';
import Profile from './views/profile/Profile';
import Login from './views/login/Login';
import NotFound from './views/NotFound';
import Demo from './views/Demo'

function App() {
  return (
    <>
    <div><Toaster/></div>
    <Router>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/demo" element={<Demo />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </>
  );
}
export default App;
