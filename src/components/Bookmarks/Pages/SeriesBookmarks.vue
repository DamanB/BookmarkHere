<template>
  <div id="series-bookmarks-container">
    <div class="container"><BookmarkBoxContainer /></div>
    <!-- <div class="container"><BookmarkBoxContainer /></div>
    <div class="container"><BookmarkBoxContainer /></div>
    <div class="container"><BookmarkBoxContainer /></div>
    <div class="container"><BookmarkBoxContainer /></div>
    <div class="container"><BookmarkBoxContainer /></div>
    <div class="container"><BookmarkBoxContainer /></div>
    <div class="container"><BookmarkBoxContainer /></div>
    <div class="container"><BookmarkBoxContainer /></div> -->
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
#series-bookmarks-container {
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