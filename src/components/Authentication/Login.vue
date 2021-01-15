<template>
  <div id="login-container" class="box-container">
        <div class="container-content auth-container">
            <form name="loginForm" @submit.prevent="loginSubmit">
                <span class="authTitle">Login!</span>
                <label>Email:
                    <input type="email" name="loginemail" v-model="loginemail" required>
                </label>
                <label>Password:
                    <input type="password" name="loginpassword" v-model="loginpassword" required>
                </label>
                <label>
                    <button name="submit">Login!</button>
                </label>

                <p v-if="loginErrors.length">
                    <ul>
                       <li v-for="error in loginErrors" v-bind:key=error>{{ error }}</li>
                    </ul>
                </p>

            </form>
        </div>
        <div class="container-bottom"></div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    // Login
    const loginErrors = ref([]);
    const loginemail = ref(null);
    const loginpassword = ref(null);
    const loginSubmit = () => {
      console.log("login attempt with " + loginemail.value + " pass " + loginpassword.value);
    };
    return { loginErrors, loginemail, loginpassword, loginSubmit };
  }
};
</script>

<style>


</style>