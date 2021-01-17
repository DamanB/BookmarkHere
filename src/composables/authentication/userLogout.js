import { ref } from 'vue'
import { projectAuth } from '@/firebase/config'

const error = ref(null)

const logout = async () => {
    error.value = null
    try{
        await projectAuth.signOut()
    }
    catch(err)
    {
        console.log("Error signing user out!")
        error.value = err.message
    }
}

const userLogout = () => {
    return {logout, error}
}

export default userLogout