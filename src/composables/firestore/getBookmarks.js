import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'


const getBookmarks = () => {

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
            await loadBookmarks("SeriesBookmarks", uid, bookmarks.Series)
            //loadBookmarks("MoviesBookmarks", uid, bookmarks.Movies)
            //loadBookmarks("BooksBookmarks", uid, bookmarks.Books)
        }catch(err){
            throw err
        }
    }
   
    const loadBookmarks = async (collectionName, uid, storage) =>
    {
        try{
            const collection = await projectFirestore.collection(collectionName)
            const response = await collection.where('uid','==',uid).orderBy('createdAt').get()
            storage.value = response.docs.map(doc => {
                return {...doc.data(), bookmarkId: doc.id}
            })
            // const res = collection.where('uid','==',uid).orderBy('createdAt', "desc").onSnapshot((snap) => {
            // storage.value = snap.docs.map(doc => {                   
        }catch(err){
            throw err
        }
    }


    return {getAllBookmarks, loadAllBookmarks}
}

export default getBookmarks