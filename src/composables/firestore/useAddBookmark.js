import {projectFirestore} from '@/firebase/config'
import firebase from 'firebase/app'
import 'firebase/firestore'

const addSeriesBookmark = async (uid) => {
    const newBookmark = 
    {
        uid: uid,
        title: null,
        season: null,
        episode: null,
        timestamp: null,
        imageURL: null,
        completed: false,
        showTimestamp: false,
        showEpisode: true,
        showSeason: true,
        createdAt: firebase.firestore.Timestamp.now()
    }
    const response = await projectFirestore.collection('SeriesBookmarks').add(newBookmark)
}

const useAddBookmark = () => {
    return {addSeriesBookmark}
}

export default useAddBookmark