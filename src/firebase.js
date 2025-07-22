import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

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
    const user = response.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    localStorage.setItem("useremail", email); // ✅ Store name
    return { uid: user.uid, name, email }; // ✅ Return user info
  } catch (error) {
    console.log(error);
    if (error.code.indexOf("auth/") !== -1) {
      // This line might break if error.code is not a string
      toast.error(error.code.split("/")[1].split("-").join(" "));
    }
    return null;
  }
};

const login = async (email, password) => {
  try {
    // await signInWithEmailAndPassword(auth, email, password);

    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = response.user;

    const q = query(collection(db, "user"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

    if (!docs.empty) {
      const userData = docs.docs[0].data();
      localStorage.setItem("useremail", userData.email); // ✅ Store email
      return { uid: user.uid, name: userData.name, email };
    } else {
      return { uid: user.uid, name: null, email };
    }
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
    return null;
  }
};

const logout = async () => {
  await signOut(auth);
};

export { auth, db, login, signup, logout };
