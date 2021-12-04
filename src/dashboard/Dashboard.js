import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/login');
    setName(user.displayName);
  }, [user, loading, navigate]);

  if (loading) return <div></div>;

  return (
    <div>
      <h1>Hello {name}</h1>
      <p onClick={logout}> logout </p>
    </div>
  );
}
