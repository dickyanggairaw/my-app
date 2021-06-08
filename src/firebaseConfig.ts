import { rejects } from 'assert'
import firebase from 'firebase'
import {presentToast} from './toast'

const config = {
  apiKey: "AIzaSyDjaBBC4bz5YaHIBqNNSS8BrsSqufm99Js",
  authDomain: "app-kuu.firebaseapp.com",
  projectId: "app-kuu",
  storageBucket: "app-kuu.appspot.com",
  messagingSenderId: "483561590109",
  appId: "1:483561590109:web:1680c274e7d89908fb2cb4"
}

firebase.initializeApp(config)

export async function loginUser(email: string, password: string){
  try {
    const res = await firebase.auth().signInWithEmailAndPassword(email,password)
    return res
  } catch (error) {
    presentToast(error.message)
    return false 
  }
} 

export async function registerUser(email: string, password: string) {
  try {
    const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
    // console.log(res)
    return res
  } catch (error) {
    presentToast(error.message)
    return false
  }
}

export function getUser(){
  return new Promise((resolve, rejects) => {
    const unsubscribe =  firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        const {email, displayName, photoURL} = user
        resolve({email, displayName, photoURL})
      }else{
        resolve(null)
      }
      unsubscribe()
    })
  })
}

export function updateUser(){
  console.log("bisa")
  return new Promise((resolve, rejects) => {
    const unsubscribe =  firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        user.updateProfile({
          displayName: "Jane Q. User",
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function(user) {
          // Update successful.
          console.log(user)
          resolve(user)
        }).catch(function(error) {
          // An error happened.
          console.log(error)
        });
      }else{
        resolve(null)
      }
      unsubscribe()
    })
  })
}
