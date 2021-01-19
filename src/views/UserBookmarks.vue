<template>
  <Navbar />
  <SeriesBookmarks v-if="activeTab == tabs[0]"/>
  <MoviesBookmarks v-if="activeTab == tabs[1]"/>
  <BooksBookmarks v-if="activeTab == tabs[2]"/>

</template>

<script>
//Dependencies
import { ref } from 'vue'
//composables
import getUser from "@/composables/authentication/getUser";
import useTabsNavigation from "@/composables/navigation/useTabsNavigation";

//Components
import Navbar from "@/components/Navigation/Navbar.vue";
import SeriesBookmarks from "@/components/Bookmarks/Pages/SeriesBookmarks.vue"
import MoviesBookmarks from "@/components/Bookmarks/Pages/MoviesBookmarks.vue"
import BooksBookmarks from "@/components/Bookmarks/Pages/BooksBookmarks.vue"

export default {
  components: {
    Navbar,
    SeriesBookmarks,
    MoviesBookmarks,
    BooksBookmarks
  },
  setup(){
    const { getTabs, getActiveTab } = useTabsNavigation()
    const { tabs } = getTabs()
    const { activeTab } = getActiveTab()
      
    return { tabs, activeTab}
  }
}

</script>

<style>

</style>