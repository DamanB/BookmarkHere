import { ref } from 'vue'
import { projectAuth } from '@/firebase/config'

const error = ref(null)

const register = async (email, password, displayName) => {
    //reset error
    error.value = null
    //register
    try {
        //create account
        const response = await projectAuth.createUserWithEmailAndPassword(email, password)
        if (!response) {
            throw new Error("Unable to complete the registration")
        }
        //update display name
        await response.user.updateProfile({ displayName })
        //no error if last line successful
        error.value = null;
        return response.user
    }
    catch (err) {
        var errorCode = err.code;
        if (errorCode == 'auth/email-already-in-use') {
            error.value = "Email already in use by another account!";
          }
          else if (errorCode == 'auth/invalid-email') {
            error.value = "This email is not valid!";
          }
          else {
            error.value = "Registration unsuccessful!";
          }
    }
}

const userRegistration = () => {
    return { register, error }
}

export default userRegistration
