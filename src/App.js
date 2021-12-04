import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import Profile from './profile/Profile';
import NotFound from './views/NotFound';
import Demo from './views/Demo'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/demo" element={<Demo />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
