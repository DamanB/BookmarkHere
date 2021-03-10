const getBookmarkCollections = () => {

    const collections = {
        series: "Series",
        movies: "Movies",
        books: "Books"
    }

    const getCollections = () => {
        return collections
    }

    return { getCollections }

}

export default getBookmarkCollections