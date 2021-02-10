<template>
  <div
    class="threedot-container default-theme"
    :class="{
      dark: theme === 'dark',
      light: theme === 'light',
    }"
    v-on:click="clicked"
  >
    <div class="dot dot1"></div>
    <div class="dot dot2"></div>
    <div class="dot dot3"></div>
  </div>
</template>

<script>
export default {
    props: {
       theme: {
           type: String, 
           required: false,
       },
    },
    setup(props, context)
    {
        const clicked = () => {
            context.emit('clicked');
        }
        return {clicked}
    }
};
</script>

<style scoped>
.default-theme{
  --dotColor1: white;
  --dotColor2: black;
}
.light {
  --dotColor1: white;
  --dotColor2: black;
}

.dark {
  --dotColor1: black;
  --dotColor2: white;
}

.threedot-container{
  height: 100%;
  width: 100%;
  cursor: pointer;
}
.dot {
    background-color: var(--dotColor1);
    box-shadow: 2px 2px var(--dotColor2);
    border-radius: 50%;
    margin: 65% 0px;
    width: 100%;
    height: 33%;
}
.dot1{
  margin-top: 0;
}
.dot3{
  margin-bottom: 0;
}
</style>