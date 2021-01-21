<template>
  <div id="series-bookmarks-container">
      <div class="bookmarks-container" v-for="bookmark in seriesBookmarks" :key="bookmark">
        <div class="container"><SeriesBookmarkContainer /></div>
      </div>
       <div class="container"><AddBookmarkContainer @AddBookmark="addBookmark" /></div>
  </div>     
</template>

<script>
//dependencies
import { ref } from 'vue'
//components
import SeriesBookmarkContainer from "../Containers/SeriesBookmarkContainer.vue";
import AddBookmarkContainer from "../Containers/AddBookmarkContainer.vue";

export default {
  components: {
    SeriesBookmarkContainer,
    AddBookmarkContainer,
  },
  setup() {

    const seriesBookmarks = ref([])

    const addBookmark = () => {
      const bookmarkId = "bookmark" + (seriesBookmarks.lenght + 1)
      seriesBookmarks.value.push(bookmarkId)
    };

    return { addBookmark, seriesBookmarks };
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
  width: 500px;
  height: 400px;
  margin: 20px;
}
</style>