import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAMNJ3wqU7bYnWiRVRe_D-YTWcLU3i2yag",
  authDomain: "maruta-records.firebaseapp.com",
  projectId: "maruta-records",
  storageBucket: "maruta-records.appspot.com",
  messagingSenderId: "128024962597",
  appId: "1:128024962597:web:6aa7004d908c55cc64c1cc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, db, storage }