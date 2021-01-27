import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBo9laf2433x2q6qw27DZT-FUnCWk2SBiA",
    authDomain: "todoapp-code-stormer.firebaseapp.com",
    projectId: "todoapp-code-stormer",
    storageBucket: "todoapp-code-stormer.appspot.com",
    messagingSenderId: "626102161617",
    appId: "1:626102161617:web:67fd268392b9aaf195b5f0"
  };

  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();

  export { db };