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

/*if (!firebase.apps.length) {
  firebase.initializeApp(config);
}*/

class Firebase {
	constructor() {
		firebase.initializeApp(config);
		this.auth = firebase.auth();
		this.db = firebase.database();
	}

	//AUTH
	
	// Sign Up
	doCreateUserWithEmailAndPassword = (email, password) =>
  		this.auth.createUserWithEmailAndPassword(email, password);

	// Sign In
	doSignInWithEmailAndPassword = (email, password) =>
  		this.auth.signInWithEmailAndPassword(email, password);

	// Sign out
	doSignOut = () =>
  		this.auth.signOut();


	// Password Reset
	doPasswordReset = (email) =>
  		this.auth.sendPasswordResetEmail(email);

	// Password Change
	doPasswordUpdate = (password) =>
  		this.auth.currentUser.updatePassword(password);


  //USER&DB together?

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });



  //USERS

  	doCreateUser = (id, username, email) =>
	this.db.ref(`users/${id}`).set({
		username,
		email,
	});

  	onceGetUsers = () =>
  		this.db
  		.ref('users')
	  	.once('value');

  	users = () => this.db.ref('users');
  	user = uid => this.db.ref(`users/${uid}`);

  	//BUILDINGS
  	onceGetBuildings = () =>
  	this.db
    	.ref()
    	.child("buildings")
    	.once("value");

	onceGetRooms = () =>
  	this.db
    .ref()
    .child("rooms")
    .once("value");



}

export default Firebase;
/*
const auth = firebase.auth();

const db = firebase.database();

const user = uid => db.ref(`users/${uid}`);

export {
  auth,
  db,
};

*/
