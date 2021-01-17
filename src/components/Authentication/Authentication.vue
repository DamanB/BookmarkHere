<template>
  <div class="authentication-container">
    <Login @userLoggedIn="enterUserView" />
    <Registration @userRegistered="enterUserView" />
  </div>
</template>

<script>
//Dependancies
import { useRouter } from "vue-router";
import UserBookmarksVue from "../../views/UserBookmarks.vue";

//Components
import Login from "./Login.vue";
import Registration from "./Registration.vue";

export default {
  name: "Authentication",
  components: { Login, Registration },

  setup() {
    const router = useRouter();

    const enterUserView = () => {
      router.push({ name: "UserBookmarks" });
    };

    return { enterUserView };
  },
};
</script>

<style>
.auth-box-container {
  position: relative;
  margin: 2%;
  text-align: left;
  background-color: white;
  box-shadow: 0 8px 10px rgb(177, 177, 177);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
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
