import { ref } from 'vue'
import { projectAuth } from '@/firebase/config'

const user = ref(projectAuth.currentUser)

//_user is null if logout or an object if logged in
projectAuth.onAuthStateChanged(_user => {
//Store user state
user.value = _user
})

const getUser = () => {
    return { user }
}

export default getUser