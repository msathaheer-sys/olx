import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDzThcsklHcWiHDXjOkA822LgknteG8eMY",
  authDomain: "mass-ddc0b.firebaseapp.com",
  projectId: "mass-ddc0b",
  storageBucket: "mass-ddc0b.appspot.com",
  messagingSenderId: "1077577807075",
  appId: "1:1077577807075:web:e2fe3e2536e38feb4fc1d6",
  measurementId: "G-JYSQPBN62E"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

