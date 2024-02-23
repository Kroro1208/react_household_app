// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxVEvwQSjtdL3vwspUK_OkXaaYCxwfxsQ",
  authDomain: "house-hold-app-320af.firebaseapp.com",
  projectId: "house-hold-app-320af",
  storageBucket: "house-hold-app-320af.appspot.com",
  messagingSenderId: "943910147132",
  appId: "1:943910147132:web:c2e695676f4eaece3bdf39",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
