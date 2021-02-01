import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'

/**
 * Used for generic bookmark config
 */
const useModifyBookmark = () => {
    //Title
    const modifyTitle = async (collection, bookmarkId, newTitle) => {
        try{
            const doc = await projectFirestore.collection(collection).doc(bookmarkId)
            doc.update({
                title: newTitle
            })
        }catch(err){
            throw err
        }
    }

    //bookmark complete
    const modifyCompleted = async (collection, bookmarkId, completed) => {
        try{
            const doc = await projectFirestore.collection(collection).doc(bookmarkId)
            doc.update({
                completed: completed
            })
        }catch(err){
            throw err
        }
    }

    //chaneg image
    const modifyImageURL = async (collection, bookmarkId, newURL) =>
    {
        await _changeImageURL(collection, bookmarkId, newURL)
    }
    //reset image to default
    const resetImageURL = async (collection, bookmarkId) => {
        await _changeImageURL(collection, bookmarkId, "")
    }


    return { 
        modifyTitle, modifyCompleted, modifyImageURL, resetImageURL 
    }


}

//local
const _changeImageURL = async (collection, bookmarkId, newURL) => {
    try{
        const doc = await projectFirestore.collection(collection).doc(bookmarkId)
        doc.update({
            imageURL: newURL
        })
    }catch(err){
        throw err
    }
}

export default useModifyBookmark