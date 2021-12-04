import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithGoogle } from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Login() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate('/');
  }, [user, loading, navigate]);

  return (
    <div className="login_panel">
      <div className="google-btn" onClick={signInWithGoogle}>
        <button className="btn-text">
          <b>Sign in with google</b>
        </button>
      </div>
    </div>
  );
}
