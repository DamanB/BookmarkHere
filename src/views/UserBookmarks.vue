<template>
  <Navbar />
  <div v-if="bookmarks">
    <SeriesBookmarks :bookmarks="bookmarks.Series" v-if="activeTab == tabs[0]" />
    <MoviesBookmarks :bookmarks="bookmarks.Movies" v-if="activeTab == tabs[1]"/>
    <BooksBookmarks :bookmarks="bookmarks.Books" v-if="activeTab == tabs[2]"/>
  </div>
</template>

<script>
//Dependencies
import { ref } from 'vue'
//composables
import getUser from "@/composables/authentication/getUser";
import useTabsNavigation from "@/composables/navigation/useTabsNavigation";
import getBookmarks from '@/composables/firestore/getBookmarks'

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
    //Get info on user for DB query
    const { user } = getUser()
    const uid = user.value.uid
    //store bookmarks
    const {error, getAllBookmarks, loadAllBookmarks} = getBookmarks();
    const bookmarks = getAllBookmarks()
    //load bookmarks from database
    loadAllBookmarks(uid).then(() => {
      bookmarks.value = getAllBookmarks()
    })

    //for knowing which bookmarks to show
    const { getTabs, getActiveTab } = useTabsNavigation()
    const { tabs } = getTabs()
    const { activeTab } = getActiveTab()      
    return { tabs, activeTab, bookmarks }
  }
}

</script>

<style>

</style>