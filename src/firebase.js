import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from '../firebaseConfig.json';

firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();

export const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });
