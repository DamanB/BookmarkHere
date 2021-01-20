<template>
  <div class="box-container">
    <div class="container-content">
      <div class="container-image">
        <img src="@/assets/img/default_bookmark_image.jpg" alt="">
        <div class="image-overlay">

        </div>
      </div>
      <div class="container-information">
        <label for="seriesTitle"></label>
        <input type="text" class="input-text-field series-title" v-model="seriesTitle" placeholder="Click to add a title" >
        
        <div class="series-episode-container" v-if="showEpisodeNumber">
          <div class="episode-number-container">
            <label for="seriesEpisode">Now on Episode: </label>
            <input type="number" min="0" class="input-number-field series-episode-number" v-model="seriesEpisode" v-on:change="fixEpisodeNumber" v-bind:style="episodeNumberStyle" placeholder="">
          </div>
          <div class="series-timestamp-container" v-if="showTimestamp">
            <label for="seriesEpisodeTimestamp">Timestamp: </label>
            <input type="text" class="input-text-field series-episode-timestamp" placeholder="HH:MM:SS" v-on:change="fixEpisodeTimestamp" v-model="seriesTimestamp">
          </div>
        </div>
      </div>
    </div>
    <div class="bookmark-menu-icon" v-on:click="toggleMenu">
        <span v-bind:style="userMenuStyle">&#8942;</span> 
    </div>
    <div class="bookmark-menu-dropdown-container" v-if="showMenu">

    </div>
    <div class="container-bottom"></div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup(){
    //standards
    const timestampReg = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/
    const seriesTitle = ref()
    const seriesEpisode = ref()
    const seriesTimestamp = ref()

    const episodeNumberStyle = ref()
    const userMenuStyle = ref()

    const showTimestamp = ref(true)
    const showEpisodeNumber = ref (true)
    const showMenu = ref(false)

    const fixEpisodeNumber = () => {
      if (seriesEpisode.value)
      {
        if (seriesEpisode.value < 0){
          seriesEpisode.value = 0
          episodeNumberStyle.value = "width: 10%"
        }
       else
        {
          var length = seriesEpisode.value.toString().length
          var newSize = (length + 0.6) * 50
          var style = "width: " + newSize + "px;"
          episodeNumberStyle.value = style
       }
      }else{
          episodeNumberStyle.value = "width: 10%"
      }
    }

    const fixEpisodeTimestamp = () => {
      if (seriesTimestamp.value)
      {
        if (!timestampReg.test(seriesTimestamp.value))
        {
          seriesTimestamp.value = ""
        }
      }
    }

    const toggleMenu = () => {
      showMenu.value = !showMenu.value
      if (showMenu.value)
      {
        userMenuStyle.value = "font-size: 300%;"
      }
      else
      {
        userMenuStyle.value = "font-size: 250%;"
      }
    }

    return { seriesTitle, seriesEpisode, seriesTimestamp, 
    fixEpisodeNumber, episodeNumberStyle, fixEpisodeTimestamp,
    showTimestamp, showEpisodeNumber, toggleMenu, showMenu, userMenuStyle
    }
  }

};
</script>

<style>
.bookmark-menu-icon{
  position: absolute;
  top: 0;
  right: 1%;
  z-index: 2;
}
.bookmark-menu-icon span{
  color: white;
  text-shadow: 1px 1px #000000;
  font-size: 250%;
  content: "\22EE";
  cursor: pointer;
}

.bookmark-menu-dropdown-container{
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--mainColor);
  opacity: 0.75;
  width: 100%;
  height: 99%;
  border-radius: 0 0 3px 3px;
  z-index: 1;
}

.container-content{
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: var(--mainColor);
}
.container-image{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 45%;
  overflow:hidden
}
.container-image img{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
}
.image-overlay{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background-color: rgb(0, 0, 0);
  opacity: 0.1;
}
.image-overlay:hover{
  opacity: 0.5;
}
.container-information{
  position: absolute;
  top: 45%;
  left: 0;
  width: 100%;
  min-height: 54%;
  overflow: hidden;
}

.input-text-field{
  border: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.input-text-field:focus{
    border-bottom: 1px solid black;
}

.input-number-field{
  border: none;
  white-space: nowrap;
  overflow: visible;
}


.series-title{
  min-width: 96%;
  font-size: 180%;
  margin: 1% 2%;
}
.series-title:focus{
    border-bottom: 1px solid black;
}

.series-episode-container{
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: right;
  width: 100%;
  margin: 0;
}
.series-episode-container label{
  margin-right: 1%;
  font-size: 100%;
}
.series-episode-number{
  text-align: right;
  width: 10%;
  min-width: 10%;
  max-width: 50%;
  font-size: 500%;
}

.series-episode-timestamp{
  text-align: right;
  font-size: 175%;
  margin: 0 1% 1% 0; 
  width: 28%; 
}
</style>