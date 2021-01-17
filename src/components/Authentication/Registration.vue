<template>
      <div id="register-container" class="auth-box-container">
        <div class="auth-container">
            <form name="registerForm" @submit.prevent="registrationSubmit" novalidate="true">
                <span class="authTitle">Join Here!</span>
                <label>Email:
                    <input type="email" name="regEmail" v-model="regEmail" required>
                    <span class="authInfo authError">{{ regEmailError }}</span>
                </label>
                <label>Display Name:
                    <input type="text" name="regName" v-model="regName" placeholder="Maximum 10 characters" required>
                    <span class="authInfo authError">{{ regNameError }}</span>
                </label>
                <label>Password:
                    <input type="password" name="regPassword" v-model="regPassword" placeholder="Minimum 6 characters" required>
                    <!-- <span class="authInfo">(Minimum 6 charcters long)</span> -->
                    <span class="authInfo authError">{{ regPasswordError }}</span>
                </label>
                <label>Confirm Password:
                    <input type="password" name="regPasswordConfirm" v-model="regPasswordConfirm" required>
                    <span class="authInfo authError">{{ regPasswordConfirmError }}</span>
                </label>
                <label>
                    <button name="submit">Join!</button>
                    <span class="authInfo authError">{{ error }}</span>
                </label>
            </form>
        </div>
        <div class="container-bottom"></div>
    </div>
</template>

<script>
import { ref } from 'vue'
import userRegistration from '@/composables/authentication/userRegistration'

export default {
  setup(props, context){
    //Standards
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    const notJustWhiteSpace = /\S/

    //Composables
    const {register, error} = userRegistration()

    //Register
    const regEmail = ref(null);
    const regEmailError = ref(null);

    const regName = ref(null);
    const regNameError = ref(null);

    const regPassword = ref(null);
    const regPasswordError = ref(null);

    const regPasswordConfirm = ref(null);
    const regPasswordConfirmError = ref(null);

    const registrationSubmit = async () => {
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

        //Test Display Name
        regNameError.value = null
        if (!regName.value)
        {
            regNameError.value = "A display name is required"
            noFormErrors = false;
        }
        else if (regName.value.length > 10)
        {
            regNameError.value = "No more than 10 characters allowed"
            noFormErrors = false;
        }
        else if (!notJustWhiteSpace.test(regName.value))
        {
            regNameError.value = "Enter a valid display name"
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

        //Peform reg on backend if success
        if (noFormErrors)
        {
            await register(regEmail.value, regPassword.value, regName.value)
            if (!error.value)
            {
                //Registration and inital Login success on backend
                context.emit('userRegistered');
            }
        }
    };
    
    return {
        regEmail, regEmailError, 
        regName, regNameError,
        regPassword, regPasswordError,
        regPasswordConfirm, regPasswordConfirmError,
        registrationSubmit, error
    }
  }
}
</script>

<style scoped>

#register-container{
    width: 650px;
}

.authTitle{
    margin-bottom: 20px;
    margin-top: 40px;
}

.auth-container form{
    min-width: 55%;
}

.auth-container form label{
    margin: 10px 0;
}

.auth-container form button{
    margin-top: 10px;
}

</style>