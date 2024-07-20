import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDvc46y2AQlV5wWzchRz_R-JXmb-4kDnd4",
  authDomain: "chat-app-b315e.firebaseapp.com",
  projectId: "chat-app-b315e",
  storageBucket: "chat-app-b315e.appspot.com",
  messagingSenderId: "369522247818",
  appId: "1:369522247818:web:768fa831fc972ea5584573",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
