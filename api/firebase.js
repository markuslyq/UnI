import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBeqbVEH6D2o1rrf9hXbA9Vip6vjEVNT00",
    authDomain: "uni2-915b4.firebaseapp.com",
    databaseURL: "https://uni2-915b4-default-rtdb.firebaseio.com",
    projectId: "uni2-915b4",
    storageBucket: "uni2-915b4.appspot.com",
    messagingSenderId: "491481218411",
    appId: "1:491481218411:web:c8b49f31406f970bdea02e"
};

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebaseApp;