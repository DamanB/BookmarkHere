const getBookmarkCollections = () => {

    const collections = {
        series: "SeriesBookmarks",
        movies: "MoviesBookmarks",
        books: "BooksBookmarks"
    }

    const getCollections = () => {
        return collections
    }

    return { getCollections }

}

export default getBookmarkCollections