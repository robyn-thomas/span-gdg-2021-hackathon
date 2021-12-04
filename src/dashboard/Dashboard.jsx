import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, listenForCases } from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Case from './Case';
import Example from '../components/layout';

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
    <Example>
      <div>
        <h1>Hello {name}</h1>
        {caseData.map((x, i) => (
          <Case key={i} data={x} />
        ))}
      </div>
    </Example>
  );
}
