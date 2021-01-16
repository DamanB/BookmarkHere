import { ref } from 'vue'
import { projectAuth } from '@/firebase/config'

const error = ref(null)

const login = async (email, password) => {
    //reset error
    error.value = null
    //login attempt
    try {
        //login
        const response = await projectAuth.signInWithEmailAndPassword(email, password)
        //no error if last line successful
        error.value = null
        return response.user
    }
    catch (err) {
        var errorCode = err.code;
        if (errorCode == 'auth/user-not-found' || errorCode == 'auth/wrong-password') {
            error.value = "Credential mismatch!";
        }
        else if (errorCode == 'auth/invalid-email') {
            error.value = "This email is not valid!";
        }
        else {
            error.value = "Login unsuccessful!";
        }
    }
}

const userLogin = () => {
    return { error, login }
}

export default userLogin
