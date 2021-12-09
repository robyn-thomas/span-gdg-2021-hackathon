import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, listenForCases } from '../../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Case from './Case';
import Layout from '../../components/Layout';

export default function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [type, setType] = useState('open');
  const [userId, setUserID] = useState('');
  const [caseData, setCaseData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/login');
    setName(user.displayName);
    setUserID(user.uid);
    listenForCases(user.uid, (x) => setCaseData(x));
  }, [user, loading, navigate]);

  if (loading) return <div></div>;
  const getCheckboxes = () => {
    return (
      <fieldset className="space-y-5">
        <legend className="sr-only">Notifications</legend>
        <div className="relative flex flex-row items-start">
          <div className="flex items-center h-5">
            <input
              onChange={() => setType('open')}
              id="open"
              aria-describedby="comments-description"
              name="open"
              checked={type === 'open'}
              type="checkbox"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="open" className="font-medium text-gray-700">
              Open
            </label>
            <p id="comments-description" className="text-gray-500">
              List of all open cases.
            </p>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              onChange={() => setType('ignored')}
              id="ignored"
              aria-describedby="candidates-description"
              name="ignored"
              type="checkbox"
              checked={type === 'ignored'}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="candidates" className="font-medium text-gray-700">
              Ignored
            </label>
            <p id="candidates-description" className="text-gray-500">
              List of all cases you have resolved.
            </p>
          </div>
        </div>
        <div className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              onChange={() => setType('all')}
              id="all"
              checked={type === 'all'}
              aria-describedby="offers-description"
              name="all"
              type="checkbox"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="all" className="font-medium text-gray-700">
              All
            </label>
            <p id="offers-description" className="text-gray-500">
              List of all cases found.
            </p>
          </div>
        </div>
      </fieldset>
    );
  };

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
            {getCheckboxes()}
            <h1 className={'text-3xl font-bold leading-tight text-gray-900 pt-6'}>
              PII Doxxing cases
            </h1>
            {caseData.length ? (
              <ul className="space-y-3 mt-6">
                {[...caseData]
                  .filter((i) => {
                    if (type === 'ignored' && i.status === 'ignored') {
                      return i;
                    } else if (type === 'open' && i.status === 'open') {
                      return i;
                    } else if (type === 'all' && (i.status === 'ignored' || i.status === 'open')) {
                      return i;
                    }
                  })
                  .map((x, i) => (
                    <Case key={i} data={x} userId={userId} />
                  ))}
              </ul>
            ) : (
              <div>No cases</div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
}
