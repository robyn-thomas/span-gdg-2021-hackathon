import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { collection, onSnapshot, doc, getDoc, updateDoc } from 'firebase/firestore';

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
  }
};

export const logout = () => {
  auth.signOut();
};

export const listenForCases = (userid, callback) => {
  onSnapshot(collection(db, 'users/' + userid + '/cases'), (querySnapshot) => {
    callback(querySnapshot.docs.map((x) => {
      let caseData = x.data();
      caseData.id = x.id;
      return caseData
    }));
  });
};

export const getUserData = async (userid, callback) => {
  const docRef = doc(db, "users", userid);
  getDoc(docRef).then(docSnap => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    }
  });
}


export const updateUserData = async (userid, userData, callback) => {
  const docRef = doc(db, "users", userid);
  updateDoc(docRef, userData).then(x=> {
    callback(true);
  }).catch(x => {
    callback(false);
  });
}

export const updateCaseData = async (userId, caseId, statusCode) => {
  console.log(userId);
  console.log(caseId);
  db.collection("users").doc(userId).collection("cases").doc(caseId).update({
    status: statusCode
  });
}

export const updateCzzzaseData = async (userId, caseId, statusCode) => {
  console.log(userId);
  console.log(caseId);
  db.collection("users").doc(userId).collection("cases").doc(caseId).update({
    status: statusCode
  });
}