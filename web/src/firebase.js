// Import the functions you need from the SDKs you need
import firebase from 'firebase';
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsxo4flYdpc-o-md1xzuKE9pkkwmyaphU",
  authDomain: "devchallenge-7b795.firebaseapp.com",
  projectId: "devchallenge-7b795",
  storageBucket: "devchallenge-7b795.appspot.com",
  messagingSenderId: "675836791605",
  appId: "1:675836791605:web:cbb31c023c806c65511a7c",
  measurementId: "G-4T083TYJ4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = firebase.storage();
export default storage;