import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDswjex5bhAbU89lRkJPOvGv-E0iin0HJw",
  authDomain: "donationapp-9ea0f.firebaseapp.com",
  databaseURL: "https://donationapp-9ea0f.firebaseio.com",
  projectId: "donationapp-9ea0f",
  storageBucket: "donationapp-9ea0f.appspot.com",
  messagingSenderId: "1034258162280",
  appId: "1:1034258162280:web:c7d7027e81dca227e5d1dd",
  measurementId: "G-EG0DK4HV0E",
};
// Initialize Firebase

const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
