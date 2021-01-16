<template>
 <div class="authentication-container">
   <Login />
   <Registration />
</div>
</template>

<script>
//Components
import Login from './Login.vue';
import Registration from './Registration.vue';

export default {
  name: "Authentication",
  components: {Login, Registration},
};
</script>

<style>
.box-container{
  min-width: 510px;
  min-height: 460px;
}

.authentication-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.auth-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}
.auth-container form {
  margin-top: 7%;
  display: flex;
  flex-direction: column;
  text-align: left;
  justify-content: space-evenly;
  min-width: 50%;
  height: 70%;
}

.auth-container form label {
  margin: 5px 0;
  display: flex;
  flex-direction: column;
}

.authTitle {
  margin-bottom: 5px;
  text-align: center;
  font-size: 25px;
}

.authbutton {
  font-family: "Montserrat", sans-serif;
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

.authInfo {
  font-size: 13px;
  font-style: italic;
}

.authError {
  color: red;
}

.authSuccess {
  color: green;
}
</style>
