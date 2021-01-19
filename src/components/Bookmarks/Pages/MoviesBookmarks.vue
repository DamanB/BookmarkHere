<template>
  <div id="movies-bookmarks-container">
    <h1>Movies Component Under Construction</h1>
  </div>
</template>

<script>
//components
import BookmarkBoxContainer from "../Containers/BookmarkBoxContainer.vue";

export default {
  components: {
    BookmarkBoxContainer,
  },
};
</script>

<style scoped>
#movies-bookmarks-container {
  margin-top: 150px;
  display: flex;
  justify-content: space-evenly;
  flex-flow: row wrap;
}

.container {
  min-width: 500px;
  min-height: 400px;
  margin: 20px;
}
</style>