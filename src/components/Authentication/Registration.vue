<template>
      <div id="register-container" class="box-container">
        <div class="container-content auth-container">
            <form name="registerForm" novalidate="true">
                <span class="authTitle">Join Here!</span>
                <label>Email:
                    <input type="email" name="regemail" v-model="regemail" required>
                </label>
                <label>Password:
                    <input type="password" name="regpassword" v-model="regpassword" ng-minlength="6" required>
                </label>
                <label>Confirm Password:
                    <input type="password" name="regpasswordconfirm" v-model="regpasswordconfirm" ng-minlength="6" required>
                </label>
                <label>
                    <button ng-click="registerUser()">Join!</button>
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
    //Register
    const registerErrors = ref([]);
    const regemail = ref(null);
    const regpassword = ref(null);
    const regpasswordconfirm = ref(null);
    
    return {registerErrors, regemail, regpassword, regpasswordconfirm}
    }
}
</script>

<style>

</style>