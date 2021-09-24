import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: 'select_account' });

// export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider);


//checks if the user signed in is stored in the users database. if it does not exists, it stores them. basically register
export const handleUserProfile = async ({ userAuth, additionalData }) => {
    if (!userAuth) return;
    const { uid } = userAuth;
    const userRef = firestore.doc(`users/${uid}`);
    //checking if the user exists
    const snapshot = await userRef.get();
    //if it  does not exists, it stores it.
    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const timestamp = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdDate: timestamp,
                ...additionalData
            });
        } catch (err) {
            console.log(err)
        }
    }
    //regardless if it exists or not, we return the user ref to the local state
    return userRef;
}

//8/9
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    })
};