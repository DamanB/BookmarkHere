<template>
      <div id="register-container" class="box-container">
        <div class="container-content auth-container">
            <form name="registerForm" @submit.prevent="registrationSubmit" novalidate="true">
                <span class="authTitle">Join Here!</span>
                <label>Email:
                    <input type="email" name="regEmail" v-model="regEmail" required>
                    <span class="authInfo authError">{{ regEmailError }}</span>
                </label>
                <label>Password:
                    <input type="password" name="regPassword" v-model="regPassword" placeholder="Minimum 6 charcters required" required>
                    <!-- <span class="authInfo">(Minimum 6 charcters long)</span> -->
                    <span class="authInfo authError">{{ regPasswordError }}</span>
                </label>
                <label>Confirm Password:
                    <input type="password" name="regPasswordConfirm" v-model="regPasswordConfirm" required>
                    <span class="authInfo authError">{{ regPasswordConfirmError }}</span>
                </label>
                <label>
                    <button name="submit">Join!</button>
                </label>
            </form>
        </div>
        <div class="container-bottom"></div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup(){
    //Standards
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    
    //Register
    const regEmail = ref(null);
    const regEmailError = ref(null);

    const regPassword = ref(null);
    const regPasswordError = ref(null);

    const regPasswordConfirm = ref(null);
    const regPasswordConfirmError = ref(null);

    const registrationSubmit = () => {
        var noFormErrors = true;
        
        //Test email info
        regEmailError.value = null;
        if (!regEmail.value)
        {
            regEmailError.value = "An email is required"
            noFormErrors = false;
        }
        else if (!reg.test(regEmail.value))
        {
            regEmailError.value = "Enter a valid email address"
            noFormErrors = false;
        }

        //Test Password
        regPasswordError.value = null;
        if (!regPassword.value)
        {
            regPasswordError.value = "A password is required"
            noFormErrors = false;
        }
        else if (regPassword.value.length < 6)
        {
            regPasswordError.value = "Minimum 6 characters required"
            noFormErrors = false;
        }

        //Test confirm password
        regPasswordConfirmError.value = null;
        if (!regPasswordConfirm.value)
        {
            regPasswordConfirmError.value = "Please confirm password"
            noFormErrors = false;
        }
        else if (regPasswordConfirm.value !== regPassword.value)
        {
            regPasswordConfirmError.value = "Passwords do not match"
            noFormErrors = false;
        }

        //Peform reg if success
        if (noFormErrors)
        {
            console.log("REGISTERING");
        }
    };
    
    return {
        regEmail, regEmailError, 
        regPassword, regPasswordError,
        regPasswordConfirm, regPasswordConfirmError,
        registrationSubmit
    }
  }
}
</script>

<style>

</style>