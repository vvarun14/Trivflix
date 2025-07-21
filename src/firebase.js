import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtdLBw0-xDqFNTC2SkXgn7_3bByY-fQCs",
  authDomain: "trivflix.firebaseapp.com",
  projectId: "trivflix",
  storageBucket: "trivflix.firebasestorage.app",
  messagingSenderId: "573599360409",
  appId: "1:573599360409:web:ba54f80724967c4cac9f08",
  measurementId: "G-L642VTXFW5",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    alert("Registration Successful");
    const user = response.user;
    await addDoc(
      collection(db, "user", {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      })
    );
  } catch (error) {
    console.log(error);
    if (error.code.indexOf("auth/") !== -1) {
      // ⚠️ This line might break if error.code is not a string
      alert(error.message);
    }
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const logout = async () => {
  await signOut(auth);
};

export { auth, db, login, signup, logout };
