import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import NotFound from './views/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
