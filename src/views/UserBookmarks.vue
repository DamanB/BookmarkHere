<template>
  <Navbar />
  <SeriesBookmarks />
  
</template>

<script>
//Dependencies
import { ref } from 'vue'
//composables
import getUser from "@/composables/authentication/getUser";
//Components
import Navbar from "@/components/Navigation/Navbar.vue";
import SeriesBookmarks from "@/components/Bookmarks/Pages/SeriesBookmarks.vue"

export default {
  components: {
    Navbar,
    SeriesBookmarks
  },
  setup(){
  }
}
</script>

<style>

</style>