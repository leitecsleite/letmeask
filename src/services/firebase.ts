// Import the functions you need from the SDKs you need
import  firebase from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/auth';
import 'firebase/database';
// Your web app's Firebase configuration
/*
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN ,
    databaseURL: process.env.REACT_APP_DATABASE_URL ,
    projectId:process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_STORAGE_BUCKET ,
    messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID ,
    appId: process.env.REACT_APP_APP_ID
  }; 
*/

const firebaseConfig = {
  apiKey: "AIzaSyBtqD6tKyilu6wDn9eeqmij1aQRU2XX8CI",
  authDomain: "letmeask-a3098.firebaseapp.com",
  databaseURL: "https://letmeask-a3098-default-rtdb.firebaseio.com",
  projectId: "letmeask-a3098",
  storageBucket: "letmeask-a3098.appspot.com",
  messagingSenderId: "823397530775",
  appId: "1:823397530775:web:0e74a01341f518ceff3dd2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }


