<template>
  <div id="subNav" v-if="user">
    <ul id="tabs">
      <div v-for="tab in tabs" :key="tab">
        <li @click="switchTab(tab)">{{ tab }}</li>
      </div>
    </ul>
  </div>
</template>

<script>
import getUser from "@/composables/authentication/getUser";
import useTabsNavigation from "@/composables/navigation/useTabsNavigation";
import { ref } from 'vue'

export default {
  setup(props, context) {
    //get user info
    const { user } = getUser()
    
    //get tab info
    const { getTabs, getActiveTab, setActiveTab } = useTabsNavigation()
    const { tabs } = getTabs();

    //switching tabs
    const switchTab = (tab) => { 
      console.log('switching to ' + tab)
      setActiveTab(tab)
    }
    return { tabs, user, switchTab }

  }
};
</script>

<style scoped>
#subNav {
  display: flex;
  justify-content: center;
  height: 57px;
  background-color: white;
}

#tabs {
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

#tabs li {
  font-size: 18px;
  margin: auto 40px;
  padding: 2px;
}

#tabs li:hover {
  cursor: pointer;
  border-bottom: 2px solid var(--mainColor);
}
</style>