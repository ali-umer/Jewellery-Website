// firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAh6qaB6_6HcO-wgO2Sc8xDFKx7pkS92-A",
  authDomain: "axeonic-be83b.firebaseapp.com",
  projectId: "axeonic-be83b",
  storageBucket: "axeonic-be83b.firebasestorage.app",
  messagingSenderId: "306431321388",
  appId: "1:306431321388:web:0a8f0d6993e0337a293889",
  measurementId: "G-7YBW1NCCM1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
