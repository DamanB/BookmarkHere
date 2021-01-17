<template>
  <div id="subNav" v-if="user">
    <ul id="tabs">
      <li>Series</li>
      <li>Movies</li>
      <li>Books</li>
    </ul>
  </div>
</template>

<script>
import getUser from "@/composables/authentication/getUser";
export default {
  setup() {
    //get user info
    const { user } = getUser();
    return { user };
  },
};
</script>

<style scoped>
#subNav {
  display: flex;
  justify-content: center;
  height: 57px;
  background-color: white;
}

#tabs {
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

#tabs li {
  font-size: 18px;
  margin: auto 40px;
  padding: 2px;
}

#tabs li:hover {
  cursor: pointer;
  border-bottom: 2px solid black;
}
</style>