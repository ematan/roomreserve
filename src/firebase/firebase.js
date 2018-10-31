import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyBFcbZJualEICdd4wzQmuiiOj1h41xI4Dk",
  authDomain: "room-77b0f.firebaseapp.com",
  databaseURL: "https://room-77b0f.firebaseio.com",
  projectId: "room-77b0f",
  storageBucket: "room-77b0f.appspot.com",
  messagingSenderId: "720049347501"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

const db = firebase.database();

export {
  auth,
  db,
};
