<template>
  <div class="header-container">
  </div>
  <div id="series-bookmarks-container">
      <div class="bookmarks-container" v-for="bookmark in bookmarks" :key="bookmark.bookmarkId">
        <div class="container"><SeriesBookmarkContainer :bookmark="bookmark" @delete="reload" /></div>
      </div>
      <div class="bookmarks-container">
         <div class="container"><AddBookmarkContainer @AddBookmark="addBookmark" /></div>
      </div>
  </div>     
</template>

<script>
//dependencies
import { ref } from 'vue'
//composables
import getUser from '@/composables/authentication/getUser'
import getBookmarks from '@/composables/firestore/getBookmarks'
import useAddBookmark from '@/composables/firestore/useAddBookmark'

//components
import SeriesBookmarkContainer from "../Containers/SeriesBookmarkContainer.vue";
import AddBookmarkContainer from "../Containers/AddBookmarkContainer.vue";

export default {
  components: {
    SeriesBookmarkContainer,
    AddBookmarkContainer,
  },
  setup() {
    //setup composables
    const { addSeriesBookmark } = useAddBookmark()    
    const { getAllBookmarks, loadSeriesBookmarks} = getBookmarks();
    const { user } = getUser()

    //get user info
    const uid = user.value.uid
    loadSeriesBookmarks(uid)
    var bookmarks = getAllBookmarks().series

    //add a new bookmark
    const addBookmark = async () => {
      var newBookmark = await addSeriesBookmark(uid)
      bookmarks.value.push(newBookmark)
    };

    const reload = async () => {
      console.log("reloading");
      loadSeriesBookmarks(uid)
      bookmarks = getAllBookmarks().series
    }

    return { addBookmark, bookmarks, reload };
  },
};
</script>

<style scoped>
#series-bookmarks-container {
  display: grid;
  grid-template-columns: repeat(3, auto);
}

.bookmarks-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 500px;
  height: 400px;
  margin: 20px;
}
</style>