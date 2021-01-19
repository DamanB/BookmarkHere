import { ref } from 'vue'

const tabs = ref(['Series', 'Movies', 'Books'])
const activeTab = ref(tabs.value[0])

const getTabs = () => {
    return { tabs }
}

const getActiveTab = () => {
    return { activeTab }
}

const setActiveTab = (tab) => {
    activeTab.value = tab
}

const useTabsNavigation = () => {
    return { getTabs, getActiveTab, setActiveTab } 
}

export default useTabsNavigation 

