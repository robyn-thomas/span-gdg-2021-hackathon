import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, getUserData, updateUserData } from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Example from '../components/layout';

export default function Profile() {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState({});
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/login');
    getUserData(user.uid, x => setUserData(x));
  }, [user, loading, navigate]);

  if (loading) return <div></div>;

  let submitData = x => {
    setUpdating(true)
    updateUserData(userData.uid, userData, x => setUpdating(false));
  }

  return (
    <Example>
      <div>
        <h1>Profile</h1>
        <p> Name </p> {userData.name ? <input type="text" value={userData.name} onChange={x => setUserData({...userData, name: x.target.value})}/> : <p> nope </p> }
        <p> Email </p> {userData.email ? <input type="text" value={userData.email} onChange={x => setUserData({...userData, email: x.target.value})}/> : <p> nope </p> }
        <p> Phone Number </p> {userData.phoneNumber ? <input type="text" value={userData.phoneNumber} onChange={x => setUserData({...userData, phoneNumber: x.target.value})}/> : <p> nope </p> }
        <p> Address </p> {userData.streetAddress ? <input type="text" value={userData.streetAddress} onChange={x => setUserData({...userData, streetAddress: x.target.value})}/> : <p> nope </p> }
        {userData.areaAddress ? <input type="text" value={userData.areaAddress} onChange={x => setUserData({...userData, areaAddress: x.target.value})}/> : <p> nope </p> }
        {userData.cityAddress ? <input type="text" value={userData.cityAddress} onChange={x => setUserData({...userData, cityAddress: x.target.value})}/> : <p> nope </p> }
        {userData.country ? <input type="text" value={userData.country} onChange={x => setUserData({...userData, country: x.target.value})}/> : <p> nope </p> } <br />
        
        {!updating ? <button onClick={submitData} className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          Update
        </button> :
        <p> Busy updating </p> }
      </div>
    </Example>
  );
}
