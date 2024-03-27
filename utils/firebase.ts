import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyApgt6i3MkQpo241bky9MPoxlqn1GIfs8k",
  authDomain: "appcultor-5a7c7.firebaseapp.com",
  databaseURL: "https://appcultor-5a7c7-default-rtdb.firebaseio.com",
  projectId: "appcultor-5a7c7",
  storageBucket: "appcultor-5a7c7.appspot.com",
  messagingSenderId: "79066528948",
  appId: "1:79066528948:web:079b44bbee38d82bf2ebe1",
  measurementId: "G-TJ39DRN8R2"
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase


