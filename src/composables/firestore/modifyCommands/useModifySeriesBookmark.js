import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'

import getBookmarkCollections from '@/composables/firestore/getBookmarkCollections'

/**
 * Used for generic bookmark config
 */
const useModifySeriesBookmark = () => {
    const { getCollections } = getBookmarkCollections()

    //placeholder
    const modifyPlaceholder = async (bookmarkId, newSeason, newEpisode, newTimestamp) => {
        try{
            const doc = await projectFirestore.collection(getCollections().series).doc(bookmarkId)
            doc.update({
                season: newSeason,
                episode: newEpisode,
                timestamp: newTimestamp
            })
        }catch(err){
            throw err
        }
    }

    const modifyConfig = async (bookmarkId, showSeason, showEpisode, showTimestamp) => {
        try{
            const doc = await projectFirestore.collection(getCollections().series).doc(bookmarkId)
            doc.update({
                showSeason: showSeason,
                showEpisode: showEpisode,
                showTimestamp: showTimestamp
            })
        }catch(err){
            throw err
        }
    }

    return { modifyPlaceholder, modifyConfig }


}

export default useModifySeriesBookmark 