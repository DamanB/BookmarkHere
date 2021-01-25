<template>
  <div id="series-bookmarks-container">
      <div class="bookmarks-container" v-for="bookmark in bookmarks" :key="bookmark.bookmarkID">
        <div class="container"><SeriesBookmarkContainer :bookmark="bookmark" /></div>
      </div>
       <div class="container"><AddBookmarkContainer @AddBookmark="addBookmark" /></div>
  </div>     
</template>

<script>
//dependencies
import { ref } from 'vue'
//composables
import getUser from '@/composables/authentication/getUser'
//components
import SeriesBookmarkContainer from "../Containers/SeriesBookmarkContainer.vue";
import AddBookmarkContainer from "../Containers/AddBookmarkContainer.vue";

export default {
  components: {
    SeriesBookmarkContainer,
    AddBookmarkContainer,
  },
  props: ['bookmarks'],
  setup(props) {

    //getBookmarks
    const bookmarks = props.bookmarks

    //add a new bookmark
    const addBookmark = () => {
      const bookmarkId = "bookmark" + (bookmarks.length + 1)
      bookmarks.value.push(bookmarkId)
    };

    return { addBookmark, bookmarks };
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