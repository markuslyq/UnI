import firebase from './firebase';

export const auth = firebase.auth();

export const signIn = async ({ email, password }, onSuccess, onError) => {
    try {
        const { user } = await auth.signInWithEmailAndPassword(email, password);
        if (user.emailVerified){
            return onSuccess(user);
        } else {
            onError("Verification Error")
        }
    } catch (error) {
        return onError(error.code);
    }
}

export const createAccount = async ({ email, password , name}, onSuccess, onError) => {
    try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        user.updateProfile({displayName: name})
        if (user) {
            await user.sendEmailVerification();
            return onSuccess(user);
        }
    } catch (error) {
        return onError(error.code);
    }
}

export const signOut = async (onSuccess, onError) => {
    try {
        await auth.signOut();
        return onSuccess();
    } catch (error) {
        return onError(error);
    }
}

export const setOnAuthStateChanged = (onUserAuthenticated, onUserNotFound) => auth.onAuthStateChanged((user) => {
    if (user) {
        return onUserAuthenticated(user);
    } else {
        return onUserNotFound(user);
    }
});

// export const sendEmailVerification = ( user, onSuccess, onError) => {
//     if (user){
//         user.sendEmailVerification();
//         return onSuccess();
//     } else {
//         return onError();
//     }
// }


