import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC94hqCygPQdfYUtztpdWhyHQkdQSOWzH8",
  authDomain: "project-bf8f6.firebaseapp.com",
  databaseURL: "https://project-bf8f6-default-rtdb.firebaseio.com",
  projectId: "project-bf8f6",
  storageBucket: "project-bf8f6.firebasestorage.app",
  messagingSenderId: "254990860799",
  appId: "1:254990860799:web:9043f1af107a01ae9a27ca",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage(app)