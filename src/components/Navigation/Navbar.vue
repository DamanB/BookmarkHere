<template>
  <nav id="completeNavbar">
      <div><MainNavbar /></div>
      <div id="navbottom"></div>
      <div><SubNavbar /></div>
  </nav>
  <div id="navbar-spacer"></div>
</template>

<script>
//components
import MainNavbar from "@/components/Navigation/MainNavbar.vue";
import SubNavbar from "@/components/Navigation/SubNavbar.vue";

export default {
  components: {
    MainNavbar,
    SubNavbar,
  },
  setup(props, context) {
      const switchBookmarkTab = () => {
        context.emit('switchBookmarkTab');
    } 
    return { switchBookmarkTab }
  }
};
</script>

<style>
#completeNavbar {
  position: fixed;
  z-index: 1000;
  top: 0;

  display: flex;
  flex-direction: column;

  margin: 0px;
  padding: 0px;
  width: 100%;
  box-shadow: 0 8px 10px rgb(177, 177, 177);
}

#navbottom {
  height: 5px;
  background: linear-gradient(
    to right,
    var(--secColor) 0,
    var(--primColor) 66%,
    var(--thirColor) 100%
  );
  box-shadow: 0 8px 10px rgb(177, 177, 177);
}

#navbar-spacer{
  position: relative;
  width: 100%;
  height: 150px;

}
</style>