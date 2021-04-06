<template>
  <div class="header-container">
    <div class="filter-container">
      <div class="search-filter input-container">
        <label for="search">Search: </label>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search Title..."
        />
      </div>
      <div class="completed-filter input-container">
        <label for="showCompleted">Show Completed Bookmarks: </label>
        <input
          type="checkbox"
          v-model="showCompleted"
          @change="filterCompleted"
        />
      </div>
    </div>
    <div class="header-container-bottom"></div>
  </div>
  <div id="series-bookmarks-container">
    <div
      class="bookmarks-container"
      v-for="bookmark in filteredBookmarks"
      :key="bookmark.bookmarkId"
    >
      <div class="container">
        <SeriesBookmarkContainer :bookmark="bookmark" @delete="reload" />
      </div>
    </div>
    <div class="bookmarks-container">
      <div class="container">
        <AddBookmarkContainer @AddBookmark="addBookmark" />
      </div>
    </div>
  </div>
</template>

<script>
//dependencies
import { ref, computed } from "vue";
//composables
import getUser from "@/composables/authentication/getUser";
import getBookmarks from "@/composables/firestore/getBookmarks";
import useAddBookmark from "@/composables/firestore/useAddBookmark";

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
    const { addSeriesBookmark } = useAddBookmark();
    const { getAllBookmarks, loadSeriesBookmarks } = getBookmarks();
    const { user } = getUser();

    //init
    const uid = user.value.uid;
    //const bookmarks = ref();
    const showCompleted = ref(false);
    const searchQuery = ref("");

    //reload the page
    const reload = async () => {
      await loadSeriesBookmarks(uid);
    };
    reload();

    const filteredBookmarks = computed(() => {
      return getAllBookmarks().series.value.filter(
        (bookmark) =>
          bookmark.title
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) && //for Search filter
          (showCompleted.value || (!showCompleted.value && !bookmark.completed)) //for completed filter
      );
    });

    //add a new bookmark
    const addBookmark = async () => {
      var newBookmark = await addSeriesBookmark(uid);
      await reload();
    };

    return {
      filteredBookmarks,
      showCompleted,
      searchQuery,
      addBookmark,
      reload,
    };
  },
};
</script>

<style scoped>
.header-container {
  width: 90%;
  margin: 1% 0 2% 5%;

  height: 60px;
  box-shadow: 0 5px 10px rgb(177, 177, 177);
  background-color: var(--mainColor2);
  border-radius: 7px 7px;

  display: flex;
  flex-direction: column;
}
.filter-container {
  width: 100%;
  height: 95%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row nowrap;
}
.header-container-bottom {
  min-width: 100%;
  height: 5%;
  background: linear-gradient(
    to right,
    var(--secColor) 0,
    var(--primColor) 66%,
    var(--thirColor) 100%
  );
  border-radius: 0 0 10px 10px;
}
.input-container {
  display: flex;
  flex-flow: row nowrap;
  align-items: baseline;
  margin-right: 2%;
}

.search-filter {
  margin-left: 2%;
}
.search-filter label {
  font-size: 120%;
  margin-right: 10px;
}
.search-filter input {
  font-style: italic;
  font-size: 100%;
  width: 250px;
}

.completed-filter {
  align-items: center;
}
.completed-filter label {
  margin-right: 5px;
  font-size: 100%;
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

.container-content{
    font-size: 80% !important;
}

#series-bookmarks-container {
  display: grid;
  grid-template-columns: repeat(1, auto);
}

@media screen and (min-width: 1200px) {
  #series-bookmarks-container {
    display: grid;
    grid-template-columns: repeat(2, auto);
  }

  .container {
    width: 500px;
    height: 400px;
    margin: 20px;
  }

  .container-content{
    font-size: 100% !important;
  }
}

@media screen and (min-width: 1620px) {
  #series-bookmarks-container {
    display: grid;
    grid-template-columns: repeat(3, auto);
  }

  .container {
    width: 500px;
    height: 400px;
    margin: 20px;
  }

  .container-content{
    font-size: 90% !important;
  }
}
</style>