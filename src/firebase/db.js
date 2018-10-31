import { db } from './firebase';

export const onceGetBuildings = () =>
	db.ref().child('buildings').once('value');