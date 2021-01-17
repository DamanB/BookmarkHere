<template>
<div id="series-bookmarks-container">
    <h1>Hello World!</h1>
    <BookmarkBoxContainer />
</div>
</template>

<script>
//components
import BookmarkBoxContainer from '../Containers/BookmarkBoxContainer.vue'

export default {
    components: {
    BookmarkBoxContainer
}

}
</script>

<style>
#series-bookmarks-container
{
    margin-top: 130px;
}
</style>