import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth,onAuthStateChanged } from "firebase/auth";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCYAdRZUA22aQ3t5QedtYO8JmFbYCyO_BU",
  authDomain: "smart-restaurantfyp.firebaseapp.com",
  projectId: "smart-restaurantfyp",
  storageBucket: "smart-restaurantfyp.appspot.com",
  messagingSenderId: "188932328383",
  appId: "1:188932328383:web:b30d1a05a0f23bd709af0a",
  measurementId: "G-40P4P9HCW8"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage,auth };
