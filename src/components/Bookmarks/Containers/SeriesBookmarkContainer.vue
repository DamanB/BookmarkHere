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
        
        <div class="series-season-container" v-if="showSeasonNumber">
          <label for="seriesEpisode">Season: </label>
          <input type="number" min="0" class="input-number-field series-season-number" v-model="seriesSeason" v-on:change="fixSeasonNumber" placeholder="0">
        </div>

        <div class="series-episode-container">
          <div class="episode-number-container" v-if="showEpisodeNumber">
            <label for="seriesEpisode">Now on Episode: </label>
            <input type="number" min="0" class="input-number-field series-episode-number" v-model="seriesEpisode" v-on:change="fixEpisodeNumber" v-bind:style="episodeNumberStyle" placeholder="0">
          </div>
          <div class="series-timestamp-container" v-if="showTimestamp">
            <label for="seriesEpisodeTimestamp">Timestamp: </label>
            <input type="text" class="input-text-field series-episode-timestamp" placeholder="HH:MM:SS" v-on:change="fixEpisodeTimestamp" v-model="seriesTimestamp">
          </div>
        </div>

      </div>
    </div>
    <div class="bookmark-complete-container" v-if="bookmarkComplete">
      <span>Done!</span>
      <div>      
      </div>
    </div>
    <div class="bookmark-menu-icon" v-on:click="toggleMenu">
        <span v-bind:style="userMenuStyle">&#8942;</span> 
    </div>
    <div class="bookmark-menu-dropdown-container" v-if="showMenu">
      <div class="menu-content">
        <span class="menu-title">Bookmark Settings</span>
        <div class="menu-bookmarkComplete">
            <label for="bookmarkComplete">Series Completed: </label>
            <input type="checkbox" v-model="bookmarkComplete">
        </div>
        <div>
          <label for="showSeasonNumber">Show Season: </label>
         <input type="checkbox" v-model="showSeasonNumber">
       </div>
        <div>
          <label for="showTimestamp">Show Timestamp: </label>
         <input type="checkbox" v-model="showTimestamp">
       </div>
        <div>
          <label for="showEpisodeNumber">Show Episode Number: </label>
          <input type="checkbox" v-model="showEpisodeNumber">
        </div>
      </div>
    </div>
    <div class="container-bottom"></div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: ['bookmark'],
  setup(props){
    const data = props.bookmark
    //standards
    const timestampReg = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/
    
    //data
    const seriesTitle = ref(data.title)
    const seriesSeason = ref(data.season)
    const seriesEpisode = ref(data.episode)
    const seriesTimestamp = ref(data.timestamp)
    const seriesImageURL = ref(data.imageURL)
    const bookmarkComplete = ref(data.completed)
    const showTimestamp = ref(data.showTimestamp)
    const showEpisodeNumber = ref (data.showEpisode)
    const showSeasonNumber = ref (data.showSeason)

    const episodeNumberStyle = ref()
    const userMenuStyle = ref()

    const showMenu = ref(false)

    const fixEpisodeNumber = () => {
      if (seriesEpisode.value)
      {
        if (seriesEpisode.value < 0){
          seriesEpisode.value = 0
          episodeNumberStyle.value = "width: 15%"
        }
       else
        {
          var length = seriesEpisode.value.toString().length
          var newSize = (length + 0.5) * 50
          var style = "width: " + newSize + "px;"
          episodeNumberStyle.value = style
       }
      }else{
          episodeNumberStyle.value = "width: 15%"
      }
    }

    const fixSeasonNumber = () => {
      if (seriesSeason.value)
      {
        if (seriesSeason.value < 0){
          seriesSeason.value = 0
        }
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

    return { seriesTitle, seriesSeason, seriesEpisode, seriesTimestamp, bookmarkComplete, seriesImageURL,
    fixEpisodeNumber, episodeNumberStyle, fixEpisodeTimestamp, fixSeasonNumber,
    showTimestamp, showEpisodeNumber, showSeasonNumber,
    toggleMenu, showMenu, userMenuStyle
    }
  }

};
</script>

<style scoped>

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
  transition-duration: .2s;
}

.bookmark-menu-dropdown-container{
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.85;
  width: 100%;
  height: 99%;
  border-radius: 0 0 3px 3px;
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.menu-content{
 padding-left: 20%;
  max-width: 80%;
  display:flex;
  flex-flow: column wrap;
  justify-content: flex-start;
}
.menu-title{
  padding: 13% 0 8% 0;
  font-size: 200%;
}
.bookmark-menu-dropdown-container .menu-bookmarkComplete{
    margin: 0 0 7% 0;
}
.bookmark-menu-dropdown-container .menu-bookmarkComplete label{
  font-size: 150%;
}
.bookmark-menu-dropdown-container div{
  margin: 0 0 5% 0;
  text-align: left;
  width: 100%;
}
.bookmark-menu-dropdown-container label{
  font-size: 120%;
  text-align: left;
  margin-right: 2%;
}

.bookmark-complete-container{
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  background-color: var(--mainColor);
  opacity: 0.8;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 99%;
}
.bookmark-complete-container span{
  color: white;
  font-size: 300%;
  text-align: center;
}
.bookmark-complete-container div{
  height: 55%;
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
.input-number-field:focus{
    border-bottom: 1px solid black;
}


.series-title{
  min-width: 96%;
  font-size: 200%;
  margin: 1% 2%;
}
.series-title:focus{
    border-bottom: 1px solid black;
}

.series-season-container{
  margin: 0 2%;
  font-size: 130%;
}
.series-season-number{
  width: 12%;
  font-size: 100%;
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
  margin-right: 3%;
  font-size: 100%;
}
.series-episode-number{
  text-align: left;
  width: 15%;
  min-width: 15%;
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