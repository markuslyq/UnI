import firebase from '../../firebase';
import auth from '@react-native-firebase/auth';

export function login(email, password, loginComplete){
    //const user = { 'email' : email, 'password' : password}
    
    firebase.auth()
        .signInWithEmailAndPassword(email, password, loginComplete)
        .then(() => loginComplete)
        .catch((error) => console.log("error: " . error))

        console.log("Email: ", email);
        console.log("Password: ", password);
}