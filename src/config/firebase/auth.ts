import config from "./firebase.config";
import { FirebaseApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";


const auth = getAuth(config.app as FirebaseApp);

const createUser = async (email: string, password: string) => {
    const response = await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            return { error: false, data: user }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { error: true, data: error }
        });
    return response;
}

const logIn = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            return { error: false, data: user }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { error: true, data: error }
        });
    return result;
};

const sendPasswordEmail = async ( email: string ) => {
        const result = await sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                return {message: `Verificar el correo: ${email}`}
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                return { error: true, data: error }
            });
    return result
};

export default { createUser, logIn, sendPasswordEmail }