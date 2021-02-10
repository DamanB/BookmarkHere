<template>
  <link
    href="https://fonts.googleapis.com/css?family=Montserrat"
    rel="stylesheet"
  />
  <router-view />
</template>

<script>
export default {
}
</script>

<style>
@import './assets/styles/container.css';

#app {
  font-family: "Montserrat", sans-serif;
}

:root {
  --mainColor: rgb(9, 26, 73);
  --mainColor2: white;
  --primColor: rgb(153, 35, 163);
  --secColor: rgb(0, 102, 255);
  --thirColor: orange;
}

body {
  background-color: rgb(212, 212, 212);
  margin: 0px;
}
</style>
