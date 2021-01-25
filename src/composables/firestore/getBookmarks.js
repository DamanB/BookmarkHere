import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'


const getBookmarks = () => {
    const error = ref(null)

    const bookmarks = {
        Series: ref([]),
        Movies: ref([]),
        Books: ref([])
    };    

    const getAllBookmarks = () => {
        return bookmarks
    }

    const loadAllBookmarks = async (uid) => {
        try{
            loadBookmarks("SeriesBookmarks", uid, bookmarks.Series)
            loadBookmarks("MoviesBookmarks", uid, bookmarks.value.Movies)
            loadBookmarks("BooksBookmarks", uid, bookmarks.value.Series)
        }catch(err){
            error.value = err.message
        }
    }
   
    const loadBookmarks = (collectionName, uid, storage) =>
    {
        try{
            const collection = projectFirestore.collection(collectionName)
            collection.where('uid','==',uid).orderBy('createdAt','title').onSnapshot((snap) => {
                storage.value = snap.docs.map(doc => {
                    return {...doc.data(), bookmarkId: doc.id}
                })
            })
        }catch(err){
            error.value = err.message
        }
    }


    return {error, getAllBookmarks, loadAllBookmarks}
}

export default getBookmarks