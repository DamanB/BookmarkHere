<template>
  <div class="header-container">
    <div class="filter-container">
      <div class="left-box filterbox"></div>
      <div class="content-box filterbox">
        <div class="search-filter">
          <label for="search">Search: </label>
          <input type="text" placeholder="Search Title">
        </div>
        <div class="checkbox-filter">
          <label for="showCompleted">Show Completed Bookmarks: </label>
          <input type="checkbox" v-model="showCompleted" @change="filterCompleted">
        </div>
      </div>
      <div class="right-box filterbox"></div>
    </div>
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
    //get bookmarks
    const bookmarks = ref();

    //filter
    const showCompleted = ref(true)
    const filterCompleted = async () => {
      if (showCompleted.value)
      {
        bookmarks.value = getAllBookmarks().series.value
      }
      else
      {
        var temp = []
        getAllBookmarks().series.value.forEach((bookmark) => {
          if (!bookmark.completed)
          {
            temp.push(bookmark)
          }
        })    
        bookmarks.value = temp  
      }
    }

    //add a new bookmark
    const addBookmark = async () => {
      var newBookmark = await addSeriesBookmark(uid)
      await reload()
    };

    const reload = async () => {
      await loadSeriesBookmarks(uid)
      bookmarks.value = getAllBookmarks().series.value
      filterCompleted()
    }
    //first time init
    reload()

    return { showCompleted, filterCompleted, addBookmark, bookmarks, reload };
  },
};
</script>

<style scoped>
.header-container{
  display: flex;
  align-items: center;
  justify-content: center;
}
.filter-container{
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 10px rgb(177, 177, 177);
  margin-bottom: 1%;
}
.filterbox{
  background-color: var(--mainColor2);
  height: 50px;
}
.left-box{
  width: 10px;
  border-radius: 25% 0 0 25%;
}
.right-box{
  width: 10px;
  border-radius: 0 25% 25% 0;
}
.content-box{
    width: 1750px;
}

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