import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { collection, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDNEc2V_DVZ5tQnnHY5wm3ovDmG_oLeYZ0',
  authDomain: 'piii-74022.firebaseapp.com',
  projectId: 'piii-74022',
  storageBucket: 'piii-74022.appspot.com',
  messagingSenderId: '658804927859',
  appId: '1:658804927859:web:60812f76364108135fe906',
  measurementId: 'G-BMXKWYHESD'
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    if (user != null) {
      const query = await db.collection('users').where('uid', '==', user.uid).get();
      if (query.docs.length === 0) {
        await db.collection('users').doc(user.uid).set({
          uid: user.uid,
          name: user.displayName,
          authProvider: 'google',
          email: user.email
        });
      }
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logout = () => {
  auth.signOut();
};

export const listenForCases = (userid, callback) => {
  onSnapshot(collection(db, 'users/' + userid + '/cases'), (querySnapshot) => {
    callback(querySnapshot.docs.map((x) => x.data()));
  });
};
