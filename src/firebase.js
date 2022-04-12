import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"
import {getStorage,ref} from "@firebase/storage"
// Your web app's Firebase configuration
const firebaseConfig ={
  apiKey: "AIzaSyDq6QI1cRxC-YJgm5-F7ULCmyLmEX-7IWU",
  authDomain: "lms-development-b90b3.firebaseapp.com",
  projectId: "lms-development-b90b3",
  storageBucket: "lms-development-b90b3.appspot.com",
  messagingSenderId: "1069067830153",
  appId: "1:1069067830153:web:d9b185dadfc4a0f7b39758"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
const storageRef = ref(storage);
export const profileIconsRef= ref(storage,"profileicons");


export default app;