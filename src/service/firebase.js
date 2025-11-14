// service/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIaKYJViU8n2JRWj6L9hfUsLg-F2-c1eo",
  authDomain: "meruem-81c93.firebaseapp.com",
  projectId: "meruem-81c93",
  storageBucket: "meruem-81c93.appspot.com",
  messagingSenderId: "523939766401",
  appId: "1:523939766401:web:c83ade08aa4dc7e687ad80"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
