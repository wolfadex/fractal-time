import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig.json';

firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();
export const firestore = firebase.firestore();
