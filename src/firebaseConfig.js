/**
 * Firebase Configuration
 * 
 * Initialize Firebase app and authentication service.
 * This configuration enables Google Sign-In for the Mess Menu app.
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyBGvbWJiRJGG7VkkuDe6OmFMrPNHpXVSfA",
//   authDomain: "nust-mess-menu-backend.firebaseapp.com",
//   projectId: "nust-mess-menu-backend",
//   storageBucket: "nust-mess-menu-backend.firebasestorage.app",
//   messagingSenderId: "498560208157",
//   appId: "1:498560208157:web:ed042a5380fe6cabb9a5f4",
//   measurementId: "G-89HLSM9B1X"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAGsmz3qrcuY2S7AVJS-gApm7-6-ZYijXM",
  authDomain: "mess-menu-prod.firebaseapp.com",
  projectId: "mess-menu-prod",
  storageBucket: "mess-menu-prod.firebasestorage.app",
  messagingSenderId: "224108564204",
  appId: "1:224108564204:web:d9f7151c987d10c90a9fc9",
  measurementId: "G-EEHEM281X2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export
export const auth = getAuth(app);

export default app;
