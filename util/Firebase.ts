import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/storage'

// 初始化firebase，傳入設定檔
firebase.initializeApp({
  apiKey: "AIzaSyB9ezsl8LnmZ8qUsAWBK9UXaFtv3rq-bew",
  authDomain: "lyme-database.firebaseapp.com",
  databaseURL: "https://lyme-database.firebaseio.com",
  projectId: "lyme-database",
  storageBucket: "lyme-database.appspot.com",
  messagingSenderId: "146707569536",
  appId: "1:146707569536:web:3616255f6b118d830bff65",
  measurementId: "G-5RCNSS965S"
})

const database = firebase.database!()
const storage = firebase.storage!()

export {
  database as database,
  storage as storage,
  firebase as default
}
