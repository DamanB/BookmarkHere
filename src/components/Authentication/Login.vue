<template>
  <div id="login-container" class="auth-box-container">
        <div class="auth-container">
            <form name="loginForm" @submit.prevent="loginSubmit" novalidate>
                <span class="authTitle">Login!</span>
                <label>Email:
                    <input type="email" name="loginemail" v-model="loginEmail" required>
                    <span class="authInfo authError">{{ loginEmailError }}</span>
                </label>
                <label>Password:
                    <input type="password" name="loginpassword" v-model="loginPassword" required>
                    <span class="authInfo authError">{{ loginPasswordError }}</span>
                </label>
                <label>
                    <button name="submit">Login!</button>
                    <span class="authInfo authError">{{ error }}</span>
                </label>
            </form>
        </div>
        <div class="container-bottom"></div>
    </div>
</template>

<script>
import { ref } from 'vue'
import userLogin from '@/composables/authentication/userLogin'

export default {
  setup(props, context) {
    //Standards
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

    //composables
    const {login, error} = userLogin()

    // Login
    const loginEmailError = ref(null)
    const loginEmail = ref(null)

    const loginPasswordError = ref(null)
    const loginPassword = ref(null)

    const loginSubmit = async () => {
        var noFormErrors = true

        //Test email info
        loginEmailError.value = null;
        if (!loginEmail.value)
        {
            loginEmailError.value = "An email is required"
            noFormErrors = false;
        }
        else if (!reg.test(loginEmail.value))
        {
            loginEmailError.value = "Enter a valid email address"
            noFormErrors = false;
        }

        //Test password
        loginPasswordError.value = null;
        if (!loginPassword.value)
        {
            loginPasswordError.value = "A password is required"
            noFormErrors = false;
        }

        //Peform login if success
        if (noFormErrors)
        {
            await login(loginEmail.value, loginPassword.value)
            if (!error.value)
            {
                //Login success on backend
                context.emit('userLoggedIn');
            }
        }
    }

    return { 
        loginEmailError, loginEmail, 
        loginPasswordError, loginPassword, 
        loginSubmit, error 
    }

  }
}
</script>

<style>


</style>