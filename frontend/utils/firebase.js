// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ai-learning-ab951.firebaseapp.com",
  projectId: "ai-learning-ab951",
  storageBucket: "ai-learning-ab951.firebasestorage.app",
  messagingSenderId: "841557162225",
  appId: "1:841557162225:web:10e1015735b8224b379150"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()
// provider.setCustomParameters({
//   prompt: "select_account"
// });

export {auth, provider}