import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCoFG0RMzX3rjOrXhuPAAvTtfN5iAedoF8",
    authDomain: "scheduler-ppns.firebaseapp.com",
    databaseURL: "https://scheduler-ppns.firebaseio.com",
    projectId: "scheduler-ppns",
    storageBucket: "scheduler-ppns.appspot.com",
    messagingSenderId: "988717085712",
    appId: "1:988717085712:web:4671c969a2adfcf9a10695",
    measurementId: "G-X8W3CPJW62"
};

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

export default firebaseConfig;