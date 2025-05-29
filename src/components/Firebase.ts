import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCp23ihIZawJnOaLsegnJyNBDizg432nEY",
  authDomain: "pennywise-90bc9.firebaseapp.com",
  projectId: "pennywise-90bc9",
  storageBucket: "pennywise-90bc9.firebasestorage.app",
  messagingSenderId: "359117434491",
  appId: "1:359117434491:web:461712ae921b1e24f97cde"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
