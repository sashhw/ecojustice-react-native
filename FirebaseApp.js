import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBC9kNkplbbCGn-BmWBoh88vh4Ir2Xmri8",
  authDomain: "ecojusticern.firebaseapp.com",
  projectId: "ecojusticern",
  storageBucket: "ecojusticern.appspot.com",
  messagingSenderId: "691533357861",
  appId: "1:691533357861:web:97c605de99d8ff3e10b0cc",
  measurementId: "G-R77YPWBZ6X",
};

const app = initializeApp(firebaseConfig);
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
