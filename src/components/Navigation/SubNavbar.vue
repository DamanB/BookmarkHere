<template>
  <div id="subNav" v-if="user">
    <ul id="tabs">
      <li @click="switchTab('series')">Series</li>
      <li @click="switchTab('movies')">Movies</li>
      <li @click="switchTab('books')">Books</li>
    </ul>
  </div>
</template>

<script>
import getUser from "@/composables/authentication/getUser";
export default {
  setup(props, context) {
    //get user info
    const { user } = getUser();

    //switching tabs
    const switchTab = (tab) => { 
      console.log("Request to switch to: " + tab)
      context.emit('switchBookmarkTab');
    }
    return { user, switchTab }

  }
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
  border-bottom: 2px solid var(--mainColor);
}
</style>