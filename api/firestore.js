import firebase from './firebase';

export const db = firebase.firestore();

export const add = (email, docName, docData, isMerge) => {
    db.collection(email).doc(docName).set(docData, { merge: isMerge })
        .then(() => { console.log("Document added successfully") })
        .catch((error) => { console.log("Error adding document", error) })
}

export const get = (email, docName) => {
    // try {
    //     const doc = await db.collection(email).doc(docName).get();
    //     return onSuccess(doc.data().field);
    // } catch (error) {
    //     return onError(error);
    // }
    db.collection(email).doc(docName).get()
        .then((doc) => {
            console.log("Gotten document successfully");
            return doc.data();
        })
        .catch((error) => {
            console.log("Error reading document", error)
            return error;
        })
}