import firebase from 'firebase/app'
import 'firebase/firestore'

export default async ({ Vue }) => {
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: 'AIzaSyCak8jhPikgcVCvpOeVeAdFiXnzjIZTeEY',
    authDomain: 'poker-viewer.firebaseapp.com',
    databaseURL: 'https://poker-viewer.firebaseio.com',
    projectId: 'poker-viewer',
    storageBucket: 'poker-viewer.appspot.com',
    messagingSenderId: '264197912450',
    appId: '1:264197912450:web:cbc4151017749dbefb019b'
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  Vue.prototype.$firestore = firebase.firestore()
}
