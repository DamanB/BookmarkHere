import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAGWiSkiswDmhfzjC3opykCA0aIKoPij2k",
    authDomain: "bookmark-aa50e.firebaseapp.com",
    databaseURL: "https://bookmark-aa50e-default-rtdb.firebaseio.com",
    projectId: "bookmark-aa50e",
    storageBucket: "bookmark-aa50e.appspot.com",
    messagingSenderId: "9063186086",
    appId: "1:9063186086:web:eb5cff8e5f7e6a77c73e67",
    measurementId: "G-T76931QC77"
  }

  //init firebase
  firebase.initializeApp(firebaseConfig)
  //firestore
  const projectFirestore = firebase.firestore()
  //Auth
  const projectAuth = firebase.auth()
  //timestamps
  export { projectFirestore, projectAuth }