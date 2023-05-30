import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {getDatabase} from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0A0UsXbx-UXOAicNr2RXkfnsCFOgeU1w",
    authDomain: "cryptocurrency-app-6c303.firebaseapp.com",
    databaseURL: "https://cryptocurrency-app-6c303-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cryptocurrency-app-6c303",
    storageBucket: "cryptocurrency-app-6c303.appspot.com",
    messagingSenderId: "62742338985",
    appId: "1:62742338985:web:b86db6de73ddf9f50fb8b8"
  };

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  }
  
  const db = getDatabase();
  const auth = firebase.auth();
  
  export { db, auth };


  /*
import firebase from 'firebase/compat/app';
import {getDatabase} from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0A0UsXbx-UXOAicNr2RXkfnsCFOgeU1w",
    authDomain: "cryptocurrency-app-6c303.firebaseapp.com",
    databaseURL: "https://cryptocurrency-app-6c303-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cryptocurrency-app-6c303",
    storageBucket: "cryptocurrency-app-6c303.appspot.com",
    messagingSenderId: "62742338985",
    appId: "1:62742338985:web:b86db6de73ddf9f50fb8b8"
  };
  
// Initialize Firebase
if (firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
  }
  
  const db = getDatabase();
  // Get a reference to the database service
  export { db }
  */