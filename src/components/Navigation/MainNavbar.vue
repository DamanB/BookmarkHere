<template>
  <div id="navMain">
    <div id="logo-container" class="left-container">
      <img src="@/assets/icons/bookmark-white.png" />
      <span id="navtitle">BookmarkHere!</span>
    </div>
    <div class="center-container">
      <!-- <span id="navsubtitle">-- All Your Bookmarks Here! --</span> -->
    </div>
    <div id="user-container" class="right-container" v-if="user">
      <div id="username">
        <span>Signed in as: </span>
        <span id="userDisplayName">{{ user.displayName }}</span>
      </div>
      <div id="user-dropdown-container">
        <button id="logoutButton" @click="logoutUser">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
//Dependancies
import { useRouter } from "vue-router";
//Composables
import getUser from "@/composables/authentication/getUser";
import userLogout from "@/composables/authentication/userLogout";
export default {
  setup() {
    //Router
    const router = useRouter();
    //get user info
    const { user } = getUser();
    //Logout button
    const { logout, error } = userLogout();

    const logoutUser = async () => {
      await logout(); //log user out
      if (!error.value) {
        //successful logout
        console.log("User logged out");
        router.push({ name: "Home" });
      } else {
        //error
        alert("Something went wrong logging you out");
      }
    };
    return { user, logoutUser };
  },
};
</script>

<style>
#navMain {
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  background: var(--mainColor);
  height: 65px;
}

.left-container {
  margin-left: 10px;
}

#logo-container {
  display: flex;
  align-items: center;
}

#logo-container img {
  width: auto;
  height: 53px;
  margin-right: 10px;
}

#navtitle {
  color: white;
  font-size: 25px;
}

#navsubtitle {
  color: white;
  font-size: 18px;
  font-style: italic;
  letter-spacing: 2px;
}

.right-container {
  margin-right: 20px;
}

#user-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;

  color: white;
}

#username {
  display: flex;
  align-items: baseline;
}

#username span:first-of-type {
  font-size: 14px;
  padding-right: 12px;
}

#userDisplayName {
  font-size: 20px;
  border-bottom: 1px solid white;
}

#user-dropdown-container {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;

  background-color: var(--mainColor);
  min-width: 200px;
  margin-top: 65px;
  padding: 8px 16px 10px 16px;
  border-radius: 0 0 3px 3px;

  text-align: center;
}

#user-container:hover #user-dropdown-container {
  display: block;
}

#logoutButton {
  font-family: "Montserrat", sans-serif;
  font-size: 17px;
  text-align: center;
  text-decoration: none;
  padding: 10px;
  width: 100%;

  background-color: var(--mainColor);
  color: white;

  border: none;
  cursor: pointer;
}

#logoutButton:hover {
  border-bottom: 1px solid white;
  color: white;
}
</style>