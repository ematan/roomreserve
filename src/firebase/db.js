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
