<template>
 <div class="authentication-container">
    <div id="login-container" class="box-container">
        <div class="container-content auth-container">
            <form name="loginForm">
                <span class="authTitle">Login!</span>
                <label>Email:
                    <input type="email" name="loginemail" ng-model="loginemail" required>
                </label>
                <label>Password:
                    <input type="password" name="loginpassword" ng-model="loginpassword" required>
                </label>
                <label>
                    <button name="submit" ng-click="loginUser()" ng-model="submitLogin" ng-disabled="loginForm.$invalid">Login!</button>
                </label>
            </form>
        </div>
        <div class="container-bottom"></div>
    </div>

    <div id="register-container" class="box-container">
        <div class="container-content auth-container">
            <form name="registerForm">
                <span class="authTitle">Join Here!</span>
                <label>Email:
                    <input type="email" name="regemail" ng-model="regemail" required>
                </label>
                <label>Password:
                    <input type="password" name="regpassword" ng-model="regpassword" ng-minlength="6" required>
                </label>
                <label>Confirm Password:
                    <input type="password" name="regpasswordconfirm" ng-model="regpasswordconfirm" ng-minlength="6" required>
                </label>
                <label>
                    <button ng-click="registerUser()" ng-model="submitReg" ng-disabled="registerForm.$invalid || regpassword != regpasswordconfirm">Join!</button>
                </label>
            </form>
        </div>
        <div class="container-bottom"></div>
    </div>
</div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Authentication",
};
</script>

<style scoped>
.authentication-container{
    display: flex;
    justify-content: center;
    width: 100%;
}

.auth-container{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
}
.auth-container form{
    margin-top: 7%;
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: space-evenly;
    min-width: 50%;
    height: 70%;
}

.auth-container form label{
    display: flex;
    flex-direction: column;
}

.authTitle{
    text-align: center;
    font-size: 25px;
}

.authbutton{
    font-family: 'Montserrat', sans-serif;
    font-size: 15px;
    text-align: center;
    text-decoration: none;
    padding: 5px 0 5px 0;

    background-color: white;
    color: var(--mainColor);
    border-radius: 5px;

    border: 1px solid var(--mainColor);
    cursor: pointer;
    transition-duration: 0.4s;
}

.authbutton:hover {
    background-color: var(--mainColor);
    color: white;
}

.authInfo{
    font-size: 13px;
    font-style: italic;
}

.authError{
    color: red;
}

.authSuccess{
    color: green;
}
</style>
