import { db } from "./firebase";

export const onceGetBuildings = () =>
  db
    .ref()
    .child("buildings")
    .once("value");

export const onceGetRooms = () =>
  db
    .ref()
    .child("rooms")
    .once("value");

export const doCreateUser = (id, username, email) =>
	db.ref(`users/${id}`).set({
		username,
		email,
	});

export const onceGetUsers = () =>
  db
	  .ref('users')
	  .once('value');

export const onceUser = (uid) =>
  db.ref(`users/${uid}`);


