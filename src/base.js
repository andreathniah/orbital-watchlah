import Rebase from "re-base";
import firebase from "firebase";
import { firebaseKey } from "./secret"

const firebaseApp = firebase.initializeApp(firebaseKey)

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp }; // named export
export default base; // default export
