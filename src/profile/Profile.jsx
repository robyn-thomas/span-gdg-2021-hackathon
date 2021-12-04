import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, getUserData, updateUserData } from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Layout from '../components/layout';
import AccountInfo from '../components/Accounts';


export default function Profile() {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState({});
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/login');
    getUserData(user.uid, (x) => setUserData(x));
  }, [user, loading, navigate]);

  if (loading) return <div></div>;

  let submitData = (x) => {
    setUpdating(true);
    updateUserData(userData.uid, userData, (x) => setUpdating(false));
  };
  return (
    <Layout>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 mt-8">
        <>
          <h1 className="text-3xl font-bold leading-tight text-gray-900 pt-6">Profile</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This information will be encrypted and kept safe.
          </p>
        </>
        <form>
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div>
              {/* User Details */}
              <div className="space-y-6 sm:space-y-5">
                {/* Name */}
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <div className="mt-1 sm:mt-0">
                      <input
                        type="text"
                        name="first-name"
                        value={userData.name}
                        onChange={(x) => setUserData({ ...userData, name: x.target.value })}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                {/*  */}
                {/* Email */}
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Email
                    </label>
                    <div className="mt-1 sm:mt-0 ">
                      <input
                        type="text"
                        name="email"
                        value={userData.email}
                        onChange={(x) => setUserData({ ...userData, email: x.target.value })}
                        id="email"
                        autoComplete="given-name"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                {/*  */}
                {/* Phone Number */}
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="phone-number"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Phone Number
                    </label>
                    <div className="mt-1 sm:mt-0">
                      <input
                        type="number"
                        name="phone-number"
                        value={userData.phoneNumber}
                        onChange={(x) => setUserData({ ...userData, phoneNumber: x.target.value })}
                        id="phone-number"
                        autoComplete="given-name"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                {/*  */}
                {/* Address label */}
                <div className="mt-1 sm:mt-0 ">
                  <h1>Address</h1>
                </div>
                {/* Address info */}
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Street
                    </label>
                    <div className="mt-1 sm:mt-0">
                      <input
                        name="street"
                        type="text"
                        value={userData.streetAddress}
                        onChange={(x) =>
                          setUserData({ ...userData, streetAddress: x.target.value })
                        }
                        id="street"
                        autoComplete="given-name"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  {/*  */}
                  {/* Area */}
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="area"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Area
                      </label>
                      <div className="mt-1 sm:mt-0">
                        <input
                          name="area"
                          type="text"
                          value={userData.areaAddress}
                          onChange={(x) =>
                            setUserData({ ...userData, areaAddress: x.target.value })
                          }
                          id="area"
                          autoComplete="given-name"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  {/* city */}
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        City
                      </label>
                      <div className="mt-1 sm:mt-0 ">
                        <input
                          name="city"
                          type="text"
                          value={userData.cityAddress}
                          onChange={(x) =>
                            setUserData({ ...userData, cityAddress: x.target.value })
                          }
                          id="city"
                          autoComplete="given-name"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  {/* country */}
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Country
                      </label>
                      <div className="mt-1 sm:mt-0">
                        <input
                          name="country"
                          type="text"
                          value={userData.country}
                          onChange={(x) => setUserData({ ...userData, country: x.target.value })}
                          id="country"
                          autoComplete="given-name"
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Accounts */}
                <AccountInfo userData={userData}/>
              </div>

              <br />

              <div className={'flex justify-end content-end'}>
                {!updating ? (
                  <button
                    onClick={submitData}
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Update
                  </button>
                ) : (
                  <p> Busy updating </p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
