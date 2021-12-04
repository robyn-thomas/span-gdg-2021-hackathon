import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, listenForCases } from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Case from './Case';
import Layout from '../components/layout';

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [caseData, setCaseData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/login');
    setName(user.displayName);
    listenForCases(user.uid, (x) => setCaseData(x));
  }, [user, loading, navigate]);

  if (loading) return <div></div>;

  return (
    <Layout>
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 pt-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl mx-auto text-gray-400">Hello {name}</h1>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 pt-6">Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <ul role="list" className="space-y-3 mt-6">
              {caseData.map((x, i) => (
                <Case key={i} data={x} />
              ))}
            </ul>
          </div>
        </main>
      </div>
    </Layout>
  );
}
