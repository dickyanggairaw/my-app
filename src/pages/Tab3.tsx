import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonList, 
  IonLabel, 
  IonInput, 
  IonItem, 
  IonImg,
  IonFab,
  IonFabButton, 
  IonIcon, } from '@ionic/react';
import './Tab3.css';
import React, {useEffect, useState} from 'react'
import { getUser, updateUser, storage, signOut } from '../firebaseConfig'
import {useHistory} from 'react-router-dom'
import { camera, trash, close } from 'ionicons/icons';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { base64FromPath } from '../hooks/usePhotoGallery'
import {presentToast} from '../toast'


const Tab3: React.FC = () => {
  const history = useHistory()
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [picture, setPicture] = useState<any>()

  useEffect(() => {
    getUser()
      .then((user: any) => {
        if(user) {
          console.log("ini user: ", user)
          setEmail(user.email)
          setName(user.displayName)
          setPicture(user.photoUrl)
        }
      }) 
  },[])
  function takePhoto(){
    Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    })
      .then((data:any) =>{
        // console.log(data)
        const fileName = new Date().getTime() + '.jpeg';
        // console.log(data.webPath)
        return base64FromPath(data.webPath!)
      .then((data: any) =>{
        const temp = data.split(',')
        const uploadTask = storage.ref(`/${fileName}`).putString(data, 'data_url')
        uploadTask.on(
          "state_changed",
        snapshot => {},
        error => {
          console.log(error)
        },
          () => storage.ref("/").child(fileName).getDownloadURL().then((url:any) => setPicture(url))
        )
      })    
    })
  }
  function buttonHandle( ){
    console.log(picture)
    updateUser(name, picture)
      .then(() => presentToast("sukses Update"))
  }
  function signOutButton(){
    signOut()
    history.push('/login')
  }
  console.log(picture)
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonImg src="https://th.bing.com/th/id/OIP.e3E1cAv_ChVq9jJqrV72YwHaEK?w=288&h=180&c=7&o=5&dpr=1.25&pid=1.7" />
      <IonList>
          <IonItem>
            <IonLabel>Name</IonLabel>
            <IonInput type="text" value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
          </IonItem>
          {/* <IonItem>
            <IonLabel>Photo</IonLabel>
            <IonInput type="file" value={name} onIonChange={e => setImage(e.detail.value!)}></IonInput>
          </IonItem> */}
          <IonButton onClick={() => buttonHandle()}>submit</IonButton>
        </IonList>
        <IonButton onClick={() => signOutButton()}>sign out</IonButton>
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
