import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBJdXNlu-r7TKIUkNaUR-uAOBv9SoNQfbI",
    authDomain: "orbital---uni.firebaseapp.com",
    projectId: "orbital---uni",
    storageBucket: "orbital---uni.appspot.com",
    messagingSenderId: "363075490260",
    appId: "1:363075490260:web:9edafd1fcc31490b514641"
};

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebaseApp;



