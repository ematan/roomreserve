/*import * as auth from './auth';
import * as db from './db';
import * as firebase from './firebase';



export {
  auth,
  db,
  firebase,
};*/

import FirebaseContext, {withFirebase} from './context';
import Firebase from './firebase';

export default Firebase;

export { FirebaseContext, withFirebase };