import userTypes from "./user.types";
import { auth, handleUserProfile, GoogleProvider } from './../../firebase/utils';


//user actions are functions that usually just contain a type and a payload

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
})

export const resetAllAuthForms = () => ({
    type: userTypes.RESET_AUTH_FORMS
})

export const signInUser = ({ email, password }) => async dispatch => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true
        });
    } catch (err) {
        console.log(err)
    }
}

export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
    //checking that the password does match with the confirmation, creating an error if they do not.
    if (password !== confirmPassword) {
        const err = ['La contraseña no concuerda'];
        dispatch({
            type: userTypes.SIGN_UP_ERROR,
            payload: err
        })
        return;
    }
    try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        await handleUserProfile(user, { displayName });
        dispatch({
            type: userTypes.SIGN_UP_SUCCESS,
            payload: true
        })

    } catch (err) {
        console.log(err)
    }
};

export const resetPassword = ({ email }) => async dispatch => {
    const config = {
        //CAMBIAR LUEGO
        url: 'http://localhost:3000/login'
    };
    try {
        await auth.sendPasswordResetEmail(email, config)
            .then(() => {
                dispatch({
                    type: userTypes.RESET_PASSWORD_SUCCESS,
                    payload: true
                })
            })
            .catch(() => {
                const err = ['Email no encontrado, por favor intente nuevamente.'];
                dispatch({
                    type: userTypes.RESET_PASSWORD_ERROR,
                    payload: err
                })
            });
    } catch (err) {
        console.log(err);
    }
}

export const signInWithGoogle = () => async dispatch => {
    try { 
        await auth.signInWithPopup(GoogleProvider)
        .then(()=> {
            dispatch({
                type: userTypes.SIGN_UP_SUCCESS,
                payload: true
            })
        })
    } catch(err) {
        console.log(err);
    }

};