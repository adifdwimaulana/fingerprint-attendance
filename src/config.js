import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAobMzZQgiMzJHlaoufyfx6Z0oxffL687I",
    authDomain: "finger-scheduler.firebaseapp.com",
    databaseURL: "https://finger-scheduler.firebaseio.com",
    projectId: "finger-scheduler",
    storageBucket: "finger-scheduler.appspot.com",
    messagingSenderId: "292392425279",
    appId: "1:292392425279:web:e9c1672e329ce89340a58a",
    measurementId: "G-NZN32M6NT4"
};

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

export default firebaseConfig