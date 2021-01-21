<template>
  <div class="box-container">
    <div id="addBookmark-content-container">
        <span v-on:click="addABookmark"> - Click to add a Bookmark - </span>
    </div>
    <div class="container-bottom"></div>
  </div>
</template>

<script>
export default {
    setup(props, context){
        const addABookmark = () => {
            context.emit("AddBookmark");
        }

        return { addABookmark }
    }
};
</script>

<style scoped>
#addBookmark-content-container {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
}
#addBookmark-content-container span{
    font-size: 140%;
    align-self: center;
    margin-bottom: 5%;
    transition-duration: 0.15s;
    cursor: pointer;
}

#addBookmark-content-container span:hover {
   font-size: 160%;
}

</style>