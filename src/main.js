import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { projectAuth } from './firebase/config'

let app
//only load app once firebase loads authentication state 
projectAuth.onAuthStateChanged(() => {
    if (!app){
        app = createApp(App).use(router).mount('#app')
    }
})
