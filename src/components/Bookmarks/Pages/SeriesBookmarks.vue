<template>
  <div id="series-bookmarks-container">
      <div class="bookmarks-container" v-for="bookmark in seriesBookmarks" :key="bookmark.bookmarkID">
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
import getBookmarks from '@/composables/firestore/getBookmarks'
//components
import SeriesBookmarkContainer from "../Containers/SeriesBookmarkContainer.vue";
import AddBookmarkContainer from "../Containers/AddBookmarkContainer.vue";

export default {
  components: {
    SeriesBookmarkContainer,
    AddBookmarkContainer,
  },
  setup() {
    //getUserdata
    const { user } = getUser()
    const uid = user.value.uid
    console.log(uid)

    //load bookmarks
    const {bookmarkTypes, load} = getBookmarks()
    const seriesBookmarks = ref([])
    load(bookmarkTypes.Series, uid).then(bookmarks => {
      seriesBookmarks.value = bookmarks
    })

    //add a new bookmark
    const addBookmark = () => {
      const bookmarkId = "bookmark" + (seriesBookmarks.lenght + 1)
      seriesBookmarks.value.push(bookmarkId)
    };

    return { user ,addBookmark, seriesBookmarks };
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