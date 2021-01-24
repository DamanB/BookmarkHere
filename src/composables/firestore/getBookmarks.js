import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'


const getBookmarks = () => {
    const error = ref(null)

    const bookmarkTypes = {
        Series: "SeriesBookmarks",
        Movies: "MoviesBookmarks",
        Books: "BooksBookmarks"
    };    

    const load = async (bookmarkType, uid) => {
        try{
            let bookmarks = []
            const collection = projectFirestore.collection(bookmarkType)
            const response = await collection.where('uid','==',uid).get()

            bookmarks = response.docs.map(doc => {
                return {...doc.data(), bookmarkId: doc.id}
            })
            return bookmarks

        }catch(err){
            error.value = err.message
        }
    }
    
    return {error, bookmarkTypes, load}
}

export default getBookmarks