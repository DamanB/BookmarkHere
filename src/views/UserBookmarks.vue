<template>
  <Navbar />
  <div>
    <SeriesBookmarks v-if="activeTab == tabs[0]" />
    <MoviesBookmarks v-if="activeTab == tabs[1]"/>
    <BooksBookmarks v-if="activeTab == tabs[2]"/>
  </div>
</template>

<script>
//Dependencies
//composables
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
    
    //for knowing which bookmarks to show
    const { getTabs, getActiveTab } = useTabsNavigation()
    const { tabs } = getTabs()
    const { activeTab } = getActiveTab()
    
    return { tabs, activeTab }
  }
}



</script>

<style>

</style>