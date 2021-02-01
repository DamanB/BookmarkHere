<template>
  <Navbar />
  <div v-if="bookmarks">
    <SeriesBookmarks :bookmarks="bookmarks.Series" :uid="uid" v-if="activeTab == tabs[0]" />
    <MoviesBookmarks :bookmarks="bookmarks.Movies" :uid="uid" v-if="activeTab == tabs[1]"/>
    <BooksBookmarks :bookmarks="bookmarks.Books" :uid="uid" v-if="activeTab == tabs[2]"/>
  </div>
</template>

<script>
//Dependencies
import { ref, watch } from 'vue'
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
    const uid = ref(user.value.uid)

    const {getAllBookmarks, loadAllBookmarks} = getBookmarks();
    //get BM
    loadAllBookmarks(uid.value)
    //store bookmarks
    const bookmarks = getAllBookmarks()
    
    //for knowing which bookmarks to show
    const { getTabs, getActiveTab } = useTabsNavigation()
    const { tabs } = getTabs()
    const { activeTab } = getActiveTab()
    
    return { tabs, activeTab, bookmarks, uid }
  }
}



</script>

<style>

</style>