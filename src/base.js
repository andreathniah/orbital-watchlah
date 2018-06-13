import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCwqBVuNRnwJmvWpA5eKEZl6YHx0m7fzsM",
  authDomain: "orbital-watchlah.firebaseapp.com",
  databaseURL: "https://orbital-watchlah.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp }; // named export
export default base; // default export  
