import {projectFirestore} from '@/firebase/config'
import firebase from 'firebase/app'
import 'firebase/firestore'

const addSeriesBookmark = async (uid) => {
    const newBookmark = 
    {
        uid: uid,
        title: "",
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
    var bookmarkId;
    const response = await projectFirestore.collection('SeriesBookmarks').add(newBookmark).then((docRef) => {
        bookmarkId = docRef.id
    })
    return {...newBookmark, bookmarkId }
}

const useAddBookmark = () => {
    return {addSeriesBookmark}
}

export default useAddBookmark