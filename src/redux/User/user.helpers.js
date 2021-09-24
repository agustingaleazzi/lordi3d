import { auth } from "../../firebase/utils";

export const handleResetPasswordAPI = ( email) => {
    const config = {
        //CAMBIAR LUEGO
        url: 'http://localhost:3000/login'
    };

    return new Promise((resolve, reject) => {
    auth.sendPasswordResetEmail(email, config)
            .then(() => {
                resolve();
            })
            .catch(() => {
                const err = ['Email no encontrado, por favor intente nuevamente.'];
                reject(err)
            });
        })
}