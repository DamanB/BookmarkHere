<template>
  <div class="box-container">
    <div class="container-content">

      <div class="container-image">
        <div v-if="seriesImageURL">
          <img :src="seriesImageURL" alt="">
        </div>
        <div v-else>
          <img :src="defaultImage" alt="">
        </div>
        <div class="image-overlay">
          <div class="change-image-button" v-on:click="toggleChangeImageMenu">
            <span>Change Image</span>
          </div>
        </div>
  
      </div>

      <div class="container-information">
        <label for="seriesTitle"></label>
        <input type="text" class="input-text-field series-title" v-model="seriesTitle" v-on:change="updateTitle" placeholder="Click to add a title" >
        
        <div class="series-season-container" v-if="showSeasonNumber">
          <label for="seriesEpisode">Season: </label>
          <input type="number" min="0" class="input-number-field series-season-number" v-model="seriesSeason" v-on:change="updateSeason" placeholder="0">
        </div>

        <div class="series-episode-container">
          <div class="episode-number-container" v-if="showEpisodeNumber">
            <label for="seriesEpisode">Now on Episode: </label>
            <input type="number" min="0" class="input-number-field series-episode-number" v-model="seriesEpisode" v-on:change="updateEpisode" v-bind:style="episodeNumberStyle" placeholder="0">
          </div>
          <div class="series-timestamp-container" v-if="showTimestamp">
            <label for="seriesEpisodeTimestamp">Timestamp: </label>
            <input type="text" class="input-text-field series-episode-timestamp" placeholder="HH:MM:SS" v-on:change="updateTimestamp" v-model="seriesTimestamp">
          </div>
        </div>

      </div>
    </div>

    <div class="bookmark-complete-container" v-if="bookmarkComplete">
      <span><i>~~ Fin ~~</i></span>
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
            <input type="checkbox" v-model="bookmarkComplete" v-on:change="updateCompleted">
        </div>
        <div>
          <label for="showSeasonNumber">Show Season: </label>
         <input type="checkbox" v-model="showSeasonNumber" v-on:change="updateConfig">
       </div>
        <div>
          <label for="showTimestamp">Show Timestamp: </label>
         <input type="checkbox" v-model="showTimestamp" v-on:change="updateConfig">
       </div>
        <div>
          <label for="showEpisodeNumber">Show Episode Number: </label>
          <input type="checkbox" v-model="showEpisodeNumber" v-on:change="updateConfig">
        </div>
      </div>
    </div>

    <div class="change-image-menu" v-if="showChangeImageMenu">
      <span id="change-image-title">Set Bookmark Image</span>
      <span id="change-image-insn">
        Provide an Image URL ending with an image extension (I.e. .jpg .png etc.)
      </span>
      <div id="change-image-input-container">
        <label for="imagheURL">Image URL: </label>
        <input type="url" id="imageURLInput" placeholder="I.e. https://i.imgur.com/xyz.jpg" v-model="newSeriesImageURL">
        <span id="change-image-insn">
          (Tip: Right click an image and copy its image location)
        </span>
      </div>
      <div id="change-image-buttons">
        <div>
          <button v-on:click="resetImage">Reset</button>  
          <button v-on:click="setImage"> Change </button>
        </div>
          <button v-on:click="toggleChangeImageMenu">Close</button>
      </div>
    </div>
    <div class="container-bottom"></div>

  </div>
</template>

<script>
import { ref } from 'vue'
import getBookmarkCollections  from '@/composables/firestore/getBookmarkCollections'
import useModifyBookmarks  from '@/composables/firestore/modifyCommands/useModifyBookmark'
import useModifySeriesBookmark from '@/composables/firestore/modifyCommands/useModifySeriesBookmark'


export default {
  props: ['bookmark'],
  setup(props){
    //props
    //standards
    const timestampReg = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/
    const defaultImage = ref(require('@/assets/img/default_bookmark_image.jpg'))
    //composables
    const { getCollections } = getBookmarkCollections()
    const { modifyTitle, modifyCompleted, modifyImageURL, resetImageURL } = useModifyBookmarks()    
    const { modifyPlaceholder, modifyConfig } = useModifySeriesBookmark()

    //bookmark data
    const seriesTitle = ref(null)
    const seriesSeason = ref(null)
    const seriesEpisode = ref(null)
    const seriesTimestamp = ref(null)
    const seriesImageURL = ref(null)
    const bookmarkComplete = ref(null)
    const showTimestamp = ref(null)
    const showEpisodeNumber = ref (null)
    const showSeasonNumber = ref (null)
    const bookmarkId = props.bookmark.bookmarkId
    const updateData = () => {
      seriesTitle.value = props.bookmark.title
      seriesSeason.value = props.bookmark.season
      seriesEpisode.value = props.bookmark.episode
      seriesTimestamp.value = props.bookmark.timestamp
      seriesImageURL.value = props.bookmark.imageURL
      bookmarkComplete.value = props.bookmark.completed
      showTimestamp.value = props.bookmark.showTimestamp
      showEpisodeNumber.value = props.bookmark.showEpisode
      showSeasonNumber.value = props.bookmark.showSeason
    }
    updateData()

    //state holders for bookmark
    const episodeNumberStyle = ref()
    const userMenuStyle = ref()
    const showMenu = ref(false)
    const showChangeImageMenu = ref(false)
    const newSeriesImageURL = ref(null)

    //Menu togglers
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

    const toggleChangeImageMenu = () => {
      showChangeImageMenu.value = !showChangeImageMenu.value
    }

    //Generic data updaters
    const updateTitle = async () => {
      await modifyTitle(getCollections().series, bookmarkId, seriesTitle.value)
    }

    const updateCompleted = async () => {
      await modifyCompleted(getCollections().series, bookmarkId, bookmarkComplete.value)
    }

    const resetImage = async () => {
      seriesImageURL.value = null
      await resetImageURL(getCollections().series, bookmarkId)
    }
 
    const setImage = async () => { 
      seriesImageURL.value = newSeriesImageURL.value
      await modifyImageURL(getCollections().series, bookmarkId, newSeriesImageURL.value)
    }

    //series specific data updaters
    const updateSeason = async () => {
      if (seriesSeason.value)
      {
        if (seriesSeason.value < 0){
          seriesSeason.value = 0
        }
      }
      await modifyPlaceholder(bookmarkId, seriesSeason.value, seriesEpisode.value, seriesTimestamp.value)
    }

    const updateEpisode = async () => {
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
      await modifyPlaceholder(bookmarkId, seriesSeason.value, seriesEpisode.value, seriesTimestamp.value)
    }

    const updateTimestamp = async () => {
      if (seriesTimestamp.value)
      {
        if (!timestampReg.test(seriesTimestamp.value))
        {
          seriesTimestamp.value = ""
        }
      }
      await modifyPlaceholder(bookmarkId, seriesSeason.value, seriesEpisode.value, seriesTimestamp.value)
    }

    const updateConfig = async () => {
      await modifyConfig(bookmarkId, showSeasonNumber.value, showEpisodeNumber.value, showTimestamp.value)
    }

    return { 
    //data
    seriesTitle, seriesSeason, seriesEpisode, seriesTimestamp, bookmarkComplete, seriesImageURL,
    defaultImage, showTimestamp, showEpisodeNumber, showSeasonNumber,
    //states
    toggleMenu, showMenu, userMenuStyle, showChangeImageMenu, toggleChangeImageMenu, episodeNumberStyle, newSeriesImageURL,
    //updaters GENERIC
    updateTitle, updateCompleted, resetImage, setImage,
    //updaters SERIES
    updateEpisode, updateSeason, updateTimestamp, updateConfig
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
  transition-duration: .1s;
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

  background-color: rgba(59, 83, 67, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 99%;
}
.bookmark-complete-container span{
  color: white;
  font-size: 225%;
  text-align: center;
}
.bookmark-complete-container div{
  height: 55%;
}

.container-content{
  width: 100%;
  height: 100%;
  font-size: 16px;
  color: black;
}
.container-image{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 50%;
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
  /* for button */
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-overlay:hover{
  opacity: 0.5;
}
.image-overlay:hover .change-image-button{
  display: block;
}
.change-image-button{
  display: none;
  text-align: center;
  width: 20%;
  height: 20%;
  color: white;
  cursor: pointer;
}
.change-image-menu{
    z-index: 3;
    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 0.88;

    padding: 0 3%;
    width: 94%;
    height: 99%;
    border-radius: 0 0 3px 3px;

    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
}
#change-image-title{
  margin: 5% 0;
  font-size: 170%;
}
#change-image-insn{
  margin-bottom: 3%;
  font-style: italic;
  font-size: 95%;
}
#change-image-input-container{
  width: 90%;
}
#change-image-input-container label{
  float: left;
  font-style: italic;
  font-size: 100%;
}
#change-image-input-container span{
  font-size: 90%;
  float: left;
  font-style: italic;
}
#change-image-input-container input{
    font-size: 100%;
    width: 99%;
}
#change-image-buttons{
  width: 90%;
}
#change-image-buttons div{
  margin-bottom: 5%;
}
#change-image-buttons button{
  margin: 0 1%;
}



.container-information{
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  min-height: 49%;
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