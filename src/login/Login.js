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
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <img className="mx-auto h-32 w-auto" src="/PI3-logo.png" alt="Workflow" />
        <h1 className="text-2xl tracking-tight mt-8 font-extrabold text-center text-gray-900 sm:text-5xl md:text-4xl">
          <span className="block xl:inline">Personal Identifiable Information</span> <br />
          <span className="block text-indigo-600 xl:inline">Investigator</span>
        </h1>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mt-20">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <div className="google-btn" onClick={signInWithGoogle}>
                <p
                  type="text"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <b>Sign in with Google</b>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
