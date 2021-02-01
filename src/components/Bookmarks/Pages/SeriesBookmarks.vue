<template>
  <div class="header-container">
  </div>
  <div id="series-bookmarks-container">
      <div class="bookmarks-container" v-for="bookmark in bookmarks" :key="bookmark.bookmarkId">
        <div class="container"><SeriesBookmarkContainer :bookmark="bookmark" /></div>
      </div>
       <div class="container"><AddBookmarkContainer @AddBookmark="addBookmark" /></div>
  </div>     
</template>

<script>
//dependencies
import { ref, watch } from 'vue'
//composables
import getUser from '@/composables/authentication/getUser'
import useAddBookmark from '@/composables/firestore/useAddBookmark'
//components
import SeriesBookmarkContainer from "../Containers/SeriesBookmarkContainer.vue";
import AddBookmarkContainer from "../Containers/AddBookmarkContainer.vue";

export default {
  components: {
    SeriesBookmarkContainer,
    AddBookmarkContainer,
  },
  props: ['bookmarks', 'uid'],
  setup(props) {
    //setup composables
    const { addSeriesBookmark } = useAddBookmark()
    //get user info
    const uid = props.uid
    //getBookmarks
    const bookmarks = props.bookmarks

    //add a new bookmark
    const addBookmark = async () => {
      await addSeriesBookmark(uid)
    };

    return { addBookmark, bookmarks };
  },
};
</script>

<style scoped>
#series-bookmarks-container {
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