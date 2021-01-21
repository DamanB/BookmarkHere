<template>
  <div id="series-bookmarks-container">
    <div class="container"><SeriesBookmarkContainer /></div>
    <div class="container"><SeriesBookmarkContainer /></div>
    <div class="container"><SeriesBookmarkContainer /></div>
    <div class="container"><SeriesBookmarkContainer /></div>
    <div class="container"><SeriesBookmarkContainer /></div>
    <div class="container"><SeriesBookmarkContainer /></div>
    <div class="container"><SeriesBookmarkContainer /></div>
    <div class="container"><SeriesBookmarkContainer /></div>
    <div class="container"><SeriesBookmarkContainer /></div>
  </div>
</template>

<script>
//components
import SeriesBookmarkContainer from "../Containers/SeriesBookmarkContainer.vue";

export default {
  components: {
    SeriesBookmarkContainer,
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
  min-width: 500px;
  min-height: 400px;
  margin: 20px;
}
</style>