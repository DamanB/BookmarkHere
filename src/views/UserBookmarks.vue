<template>
  <Navbar />
  <div id="tabs-navbar-container">
    <ul id="tabs">
      <div v-for="tab in tabs" :key="tab">
        <li @click="switchTab(tab)">{{ tab }}</li>
      </div>
    </ul>
  </div>
  <div id="tab-navbar-spacer"></div>
  <div id="tab-content-container">
    <SeriesBookmarks v-if="activeTab == tabs.series" />
    <MoviesBookmarks v-if="activeTab == tabs.movies" />
    <BooksBookmarks v-if="activeTab == tabs.books" />
  </div>
</template>

<script>
//Dependencies
import { ref } from "vue";
//composables
import getBookmarkCollections from "@/composables/firestore/getBookmarkCollections.js";

//Components
import Navbar from "@/components/Navigation/Navbar.vue";
import SeriesBookmarks from "@/components/Bookmarks/Pages/SeriesBookmarks.vue";
import MoviesBookmarks from "@/components/Bookmarks/Pages/MoviesBookmarks.vue";
import BooksBookmarks from "@/components/Bookmarks/Pages/BooksBookmarks.vue";

export default {
  components: {
    Navbar,
    SeriesBookmarks,
    MoviesBookmarks,
    BooksBookmarks,
  },
  setup() {
    const { getCollections } = getBookmarkCollections();
    const tabs = getCollections();
    const activeTab = ref(tabs.series);

    //switching tabs
    const switchTab = (tab) => { 
      activeTab.value = tab
    }

    return { tabs, activeTab, switchTab };
  },
};
</script>

<style scoped>
#tabs-navbar-container{
  z-index: 5;
  position: fixed;
  display: flex;
  justify-content: center;
  background-color: white;
  box-shadow: 0 8px 10px rgba(31, 31, 31, 0.3);
  padding-top: 0.2rem;

  height: 63px;
  width: 100%;
}
#tab-navbar-spacer{
  height: 80px;
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