import firebase from 'firebase'
import uuid from 'uuid/dist/v4'

var firebaseConfig = {
    apiKey: "AIzaSyA_ix6WezIzb3X3JuP1F0D851_pdUz-oRc",
    authDomain: "trello-clone-de99f.firebaseapp.com",
    databaseURL: "https://trello-clone-de99f-default-rtdb.firebaseio.com",
    projectId: "trello-clone-de99f",
    storageBucket: "trello-clone-de99f.appspot.com",
    messagingSenderId: "948779886327",
    appId: "1:948779886327:web:e5265b87d4e494e6e695f2",
    measurementId: "G-8WJW41GQ45"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database()
export default database

export const addTaskToFirebase = (task) => {
    const id = uuid()
    database.ref(`/${id}`).set({
        task, id
    })
}

export const removeTaskFromFirebase = (id) => {
    database.ref(`/${id}`).remove()
}