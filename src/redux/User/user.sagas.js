import { takeLatest, call, all, put } from 'redux-saga/effects';
import userTypes from "./user.types";
import { signInSuccess, signOutUserSuccess, userError, resetPassworldSuccess } from './user.actions';
import { auth, handleUserProfile, getCurrentUser, GoogleProvider } from './../../firebase/utils';
import { handleResetPasswordAPI } from './user.helpers';


export function* getSnapshotFromUserAuth(user, additionalData = {}) {
    try {
        //call gets the function as first argument, and the functions argument as a second one
        //sign in with handleUserProfile
        const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
        const snapshot = yield userRef.get();
        //updating redux
        yield put(
            signInSuccess({
                id: snapshot.id,
                ...snapshot.data()
            })
        )
    } catch (err) {

    }
}

export function* emailSignin({ payload: { email, password } }) {
    try {
        //signin in the user, not updating the store
        const user = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (err) {
        console.log(err)
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return
        yield getSnapshotFromUserAuth(userAuth);
    } catch (err) {
        //console.log(err)
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignin)
}

export function* signOutUser() {
    try {
        //log out user
        yield auth.signOut();
        //update store
        yield put(
            signOutUserSuccess()
        )
    } catch (err) {
        console.log(err)
    }
}

export function* onSignOutUserStart() {
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}

export function* signUpUser({ payload: {
    displayName,
    email,
    password,
    confirmPassword
} }) {
    //checking that the password does match with the confirmation, creating an error if they do not.
    if (password !== confirmPassword) {
        const err = ['La contraseña no concuerda'];
        yield put(
            userError(err)
        )
        return;
    }
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        const additionalData = { displayName };
        yield getSnapshotFromUserAuth(user, additionalData);
    } catch (err) {
        console.log(err)
    }
}


export function* onSignUpUserStart() {
    yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser)
}

export function* resetPassword({ payload: { email } }) {
    try {
        //yield to await for the promise to resolve
        yield call(handleResetPasswordAPI, email);
        yield put(
            resetPassworldSuccess()
        )
    } catch (err) {
        yield put(
            userError(err)
        )
    }
}

export function* onResetPasswordStart() {
    yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword)
}

export function* googleSignIn() {
    try {
        const { user } = yield auth.signInWithPopup(GoogleProvider)
        yield getSnapshotFromUserAuth(user)
    } catch (err) {
        console.log(err);
    }

}


export function* onGoogleSignInStart() {
    yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn)
}


export default function* userSagas() {
    yield all([
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutUserStart),
        call(onResetPasswordStart),
        call(onSignUpUserStart),
        call(onGoogleSignInStart)
    ])
}