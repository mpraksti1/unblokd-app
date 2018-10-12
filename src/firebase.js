import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBD5OLAROBRZ4OngDm6X1OiLGAJswdzEHA',
  authDomain: 'unblokd-c96e0.firebaseapp.com',
  projectId: 'unblokd-c96e0'
}

const settings = { timestampsInSnapshots: true };

firebase.initializeApp(config);

const db = firebase.firestore();

db.settings(settings);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default db;
