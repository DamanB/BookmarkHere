<template>
  <div id="intro">
    <h2>Welcome to</h2>
    <div id="title-container">
      <img src="@/assets/icons/bookmark-blue.png" />
      <h1>BookmarkHere!</h1>
    </div>
    <h3>Login or register to see your bookmarks!</h3>
    <div id="intro-bottom"></div>
  </div>
  <Authentication />
</template>

<script>
import Authentication from '../components/Authentication.vue';

export default {
  name: "Home",
  components: {
    Authentication
  }
};
</script>

<style scoped>
#intro{
    position: relative;
    margin: 7% 0 2% 0;
    padding: 5% 1%; 
    text-align: center;
    background-color: white;
    background-position: center center;
    background-size: 100% auto;
    background-repeat: no-repeat;
    box-shadow: 0 8px 10px rgb(177, 177, 177);
    border-radius: 5px;

    color:var(--mainColor);
}

#title-container{
    padding: 0;
    margin: 0 0 30px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

#title-container img{
    width: auto;
    height: 100px;
    margin-right: 20px;
}

#intro h1{
    font-size: 70px;
    margin: 0 0 0 0;
}

#intro h2{
    font-style: italic;
    margin: 0 0 20px 0;
    font-size: 30px;
}

#intro h3{
    font-style: italic;
    margin: 35px 0 10px 0;
    font-size: 25px;
}

#intro-bottom{
    position: absolute;
    left: 0;
    bottom: 0;
    background: linear-gradient(to right, var(--secColor) 0, var(--primColor) 66%, var(--thirColor) 100%);
    min-width: 100%;
    height: 0.5%;
}
</style>
